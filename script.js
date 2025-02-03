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
  false
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
  bookForm.style.display = "block";
}

bookForm.addEventListener("submit", (e) => parseFormData(e));

console.table(myLibrary);

function updateTable() {
  let books = document.getElementsByClassName("book");
  while (books.length > 0) {
    books[0].parentNode.removeChild(books[0]);
  }
  console.log(books);
  myLibrary.map((bookItem) => {
    const bookBox = document.createElement("div");
    bookBox.className = "book";
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

    const bookStatus = document.createElement("div");
    bookStatus.className = "bookStatus";
    if (bookItem.status === false) {
      bookStatus.innerHTML = "Not read";
    } else {
      bookStatus.innerHTML = "Done";
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delButton";
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
      console.log(bookItem);
      myLibrary = myLibrary.filter((libItem) => libItem.id != bookItem.id);
      console.log(myLibrary);
      updateTable();
    };

    bookBox.appendChild(bookTitle);
    bookBox.appendChild(bookAuthor);
    bookBox.appendChild(bookPages);
    bookBox.appendChild(bookStatus);
    bookBox.appendChild(deleteButton);

    library.appendChild(bookBox);
  });
}

updateTable();
