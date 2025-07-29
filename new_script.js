
class Book {
  constructor(id, title, author, pages, read = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.idCounter = 1;
  }

  addBook(title, author, pages, read) {
    const newBook = new Book(this.idCounter++, title, author, pages, read);
    this.books.push(newBook);
    return newBook;
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }

  toggleRead(id) {
    const book = this.books.find(book => book.id === id);
    if (book) book.toggleRead();
  }

  getBooks() {
    return this.books;
  }
}

class UIHandler {
  constructor(library) {
    this.library = library;
    this.libraryContainer = document.getElementById("library");
    this.form = document.getElementById("bookform");
    this.formButton = document.getElementById("showForm");

    this.form.addEventListener("submit", e => this.handleSubmit(e));
    this.formButton.addEventListener("click", () => this.toggleForm());
    this.render();
  }

  toggleForm() {
    const isVisible = this.form.style.display === "flex";
    this.form.style.display = isVisible ? "none" : "flex";
    this.formButton.innerHTML = isVisible ? "Add Book" : "Done";
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    this.library.addBook(
      data.get("title"),
      data.get("author"),
      data.get("pages"),
      data.get("read") === "on"
    );
    this.render();
    e.target.reset();
    this.toggleForm();
  }

  render() {
    this.libraryContainer.innerHTML = "";
    this.library.getBooks().forEach(book => {
      const bookBox = document.createElement("div");
      bookBox.className = book.read ? "bookDone" : "book";

      bookBox.innerHTML = `
        <div class="bookTitle">${book.title}</div>
        <div class="bookAuthor">${book.author}</div>
        <div class="bookPages">${book.pages}</div>
        <div class="bookDivider">
          <button class="upButton ${book.read ? "Active" : "Inactive"}">✓</button>
          <button class="delButton">🗑️</button>
        </div>
      `;

      bookBox.querySelector(".delButton").onclick = () => {
        this.library.removeBook(book.id);
        this.render();
      };

      bookBox.querySelector(".upButton").onclick = () => {
        this.library.toggleRead(book.id);
        this.render();
      };

      this.libraryContainer.appendChild(bookBox);
    });
  }
}

console.log("Hello World");

const myLibrary = new Library();
const ui = new UIHandler(myLibrary);

// Test-Daten hinzufügen
myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 310, false);
myLibrary.addBook("Harry Potter", "J.K. Rowling", 870, true);
myLibrary.addBook("Alice", "Lewis Carroll", 352, false);
myLibrary.addBook("Da Vinci Code", "Dan Brown", 689, true);
ui.render();
