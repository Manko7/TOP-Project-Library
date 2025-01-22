console.log("Hello World");

const formButton = document.getElementById("showForm");
const bookForm = document.getElementById("bookform");
const bookTable = document.getElementById("booksTable");
console.log(bookTable);

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("A Song of Fire and Ice", "J.R.R. Tolkien", 1231, false);
const book2 = new Book("Harry Potter #1", "J.K. Rowlings", 1231, false);

addBookToLibrary(book1);
addBookToLibrary(book2);

function removeBookFromLibrary(id) {
  myLibrary = myLibrary.filter((item) => {});
}

function parseFormData(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newBook = new Book(data.get("title"), data.get("author"), data.get("pages"), data.get("read"));
  addBookToLibrary(newBook);
  updateTable();
}

function showForm() {
  bookForm.style.display = "block";
}


bookForm.addEventListener("submit", (e) => parseFormData(e));

console.table(myLibrary);

function updateTable() {
  myLibrary.forEach((book) => {
    myLibrary.pop();
  })

  let counter = 0
  myLibrary.map((book) => {
    console.log(book);
    const newRow = bookTable.insertRow();
    const newTitle = newRow.insertCell(0);
    newTitle.textContent = book.title;
    const newAuthor = newRow.insertCell(1);
    newAuthor.textContent = book.author;
    const newPages = newRow.insertCell(2);
    newPages.textContent = book.pages;
    const newRead = newRow.insertCell(3);
    newRead.textContent = book.read;
    const deleteButton = newRow.insertCell(4);
    let delButton = document.createElement("button");
    delButton.id = counter;
    delButton.textContent = "delete";
    delButton.addEventListener("click", function () {
      // bookTable.deleteRow(newRow.rowIndex);
      console.log(this.id)
      console.log(myLibrary[this.id])
      myLibrary.splice(this.id, 1);
    });
    deleteButton.appendChild(delButton);
  
    const toggleButton = newRow.insertCell(5);
    let togButton = document.createElement("button");
    togButton.id = counter;
    togButton.textContent = "mark as read";
    togButton.addEventListener("click", function () {
      console.log(this.id)
      console.log(myLibrary[this.id])
      myLibrary.splice(this.id, 1);
      updateTable();
    });
    toggleButton.appendChild(togButton);
    counter += 1
  })
}

myLibrary.map((book) => {
  let counter = 0;
  console.log(book);
  const newRow = bookTable.insertRow();
  const newTitle = newRow.insertCell(0);
  newTitle.textContent = book.title;
  const newAuthor = newRow.insertCell(1);
  newAuthor.textContent = book.author;
  const newPages = newRow.insertCell(2);
  newPages.textContent = book.pages;
  const newRead = newRow.insertCell(3);
  newRead.textContent = book.read;
  const deleteButton = newRow.insertCell(4);
  let delButton = document.createElement("button");
  delButton.id = counter;
  delButton.textContent = "delete";
  delButton.addEventListener("click", function () {
    // bookTable.deleteRow(newRow.rowIndex);
    console.log(this.id)
    console.log(myLibrary[this.id])
    myLibrary.splice(this.id, 1);
  });
  deleteButton.appendChild(delButton);

  const toggleButton = newRow.insertCell(5);
  let togButton = document.createElement("button");
  togButton.id = counter;
  togButton.textContent = "mark as read";
  togButton.addEventListener("click", function () {
    console.log(this.id)
    console.log(myLibrary[this.id])
    myLibrary.splice(this.id, 1);
    updateTable();
  });
  toggleButton.appendChild(togButton);
})