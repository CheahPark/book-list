class Book {
  constructor(title, author, isbn) {
    (this.title = title), (this.author = author), (this.isbn = isbn);
  }
}

// ------ UI ------ //
class UI {
  // 1. Display books
  static displayBook(books) {
    books.forEach((book) => {
      const bookList = document.getElementById('book-list');
      const tableRow = document.createElement('tr');
      const newRow = bookList.appendChild(tableRow);
      newRow.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><button type="button" class="btn btn-primary">x</button></td>`;
    });
  }

  // 2. Delete books
  static deleteBook() {}
  // 3. Show error
  static showError() {}
}

// ----- local storage ----- //
class Storage {
  // 1. store a book
  // 2. remove a book
}

document.addEventListener('DOMContentLoaded', () => {
  const books = [
    {
      title: 'Harry Potter',
      author: 'J. K. Rolling',
      isbn: 321341,
    },
    {
      title: 'Christmas Jack',
      author: 'John Doe',
      isbn: 1234,
    },
  ];

  UI.displayBook(books);
});
