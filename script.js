console.log("Hello World");

const formButton = document.getElementById("showForm");
const bookForm = document.getElementById("bookform");
const bookTable = document.getElementById("booksTable");
console.log(bookTable);

const myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// function addBookToLibrary(book) {
//   myLibrary.push(book);
// }

// const book1 = new Book("A Song of Fire and Ice", "J.R.R. Tolkien");
// const book2 = new Book("Harry Potter #1", "J.K. Rowlings");

// addBookToLibrary(book1);
// addBookToLibrary(book2);

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((item) => {});
}

function addBookToLibrary(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newBook = new Book(data.get("title"), data.get("author"));
  myLibrary.push(newBook);
  console.table(myLibrary);

  const newRow = bookTable.insertRow();
  const newTitle = newRow.insertCell(0);
  const newAuthor = newRow.insertCell(1);
  const newOption = newRow.insertCell(2);
  let button = document.createElement("button");
  button.textContent = "delete";
  button.addEventListener("click", function () {
    bookTable.deleteRow(newRow.rowIndex);
  });
  newOption.appendChild(button);
  newTitle.textContent = data.get("title");
  newAuthor.textContent = data.get("author");
}

function showForm() {
  bookForm.style.display = "block";
}

bookForm.addEventListener("submit", (e) => addBookToLibrary(e));

console.table(myLibrary);
