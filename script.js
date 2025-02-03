console.log("Hello World");

const formButton = document.getElementById("showForm");
const bookForm = document.getElementById("bookform");
const bookTable = document.getElementById("booksTable");
const library = document.getElementById("library");
console.log(bookTable);
let idCounter = 1;

var myLibrary = [];

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  idCounter += 1;
}

const book1 = new Book(
  idCounter,
  "A Song of Fire and Ice",
  "J.R.R. Tolkien",
  1231,
  true
);

addBookToLibrary(book1);

const book2 = new Book(
  idCounter,
  "Harry Potter #1",
  "J.K. Rowlings",
  1231,
  false
);
addBookToLibrary(book2);

const book3 = new Book(idCounter, "Die drei ???", "Max KA", 9999, true);
addBookToLibrary(book3);

const book4 = new Book(
  idCounter,
  "Die Ritter der Tafelrunde",
  "KAN PLAN OIDA",
  32214,
  true
);
addBookToLibrary(book4);

function removeBookFromLibrary(bookId) {
  console.log(bookId);
  myLibrary = myLibrary.filter((item) => item.id != bookId);
  console.log(myLibrary);
}

function parseFormData(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newBook = new Book(
    idCounter,
    data.get("title"),
    data.get("author"),
    data.get("pages"),
    data.get("read")
  );
  addBookToLibrary(newBook);
  idCounter += 1;
  updateTable();
}

function showForm() {
  if (formButton.innerHTML === "Add Book") {
    bookForm.style.display = "flex";
    formButton.innerHTML = "Done";
  } else {
    bookForm.style.display = "none";
    formButton.innerHTML = "Add Book";
  }
}

bookForm.addEventListener("submit", (e) => parseFormData(e));

console.table(myLibrary);

function updateTable() {
  let books = document.getElementsByClassName("book");
  while (books.length > 0) {
    books[0].parentNode.removeChild(books[0]);
  }
  myLibrary.map((bookItem) => {
    const bookBox = document.createElement("div");
    if (bookItem.read) {
      console.log("changing to read");
      bookBox.className = "bookDone";
    } else {
      bookBox.className = "book";
    }

    bookBox.id = idCounter;

    const bookTitle = document.createElement("div");
    bookTitle.className = "bookTitle";
    bookTitle.innerHTML = bookItem.title;

    const bookAuthor = document.createElement("div");
    bookAuthor.className = "bookAuthor";
    bookAuthor.innerHTML = bookItem.author;

    const bookPages = document.createElement("div");
    bookPages.className = "bookPages";
    bookPages.innerHTML = bookItem.pages;

    const bookDivider = document.createElement("div");
    bookDivider.className = "bookDivider";

    const deleteButton = document.createElement("button");
    deleteButton.className = "delButton";
    deleteButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
    deleteButton.onclick = () => {
      myLibrary = myLibrary.filter((libItem) => libItem.id != bookItem.id);
      updateTable();
    };

    const updateButton = document.createElement("button");
    if (bookItem.read) {
      updateButton.className = "upButtonActive";
      updateButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z"/></svg>';
    } else {
      updateButton.className = "upButtonInactive";
      updateButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
    }
    updateButton.onclick = () => {
      if (myLibrary[bookItem.id - 1].read) {
        myLibrary[bookItem.id - 1].read = false;
      } else {
        myLibrary[bookItem.id - 1].read = true;
      }
      updateTable();
    };

    bookBox.appendChild(bookTitle);
    bookBox.appendChild(bookAuthor);
    bookBox.appendChild(bookPages);
    bookBox.appendChild(bookDivider);
    bookDivider.appendChild(updateButton);
    bookDivider.appendChild(deleteButton);

    library.appendChild(bookBox);
  });
}

updateTable();
