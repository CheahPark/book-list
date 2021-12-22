const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
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
      if (book.title == '' || book.author == '' || book.isbn == '') {
        return;
      } else {
        const tableRow = document.createElement('tr');
        const newRow = bookList.appendChild(tableRow);
        newRow.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><button type="button" class="btn btn-primary">x</button></td>`;
      }
    });
  }

  // 2. Delete books
  static deleteBook(e) {
    if (e.target.innerHTML == 'x') {
      const xBtn = e.target.parentElement;
      const myList = xBtn.parentElement;

      myList.remove();
    }
  }

  // 4. Show error
  static showAlert(book) {
    if (
      book['title'].length == 0 ||
      book['author'].length == 0 ||
      book['isbn'].length == 0
    ) {
      const alert = document.createElement('div');
      alert.className = 'alert alert-danger';
      alert.innerHTML = 'Please fill in all fields.';
      bookForm.prepend(alert);
    } else if (
      book['title'].length > 0 ||
      book['author'].length > 0 ||
      book['isbn'].length > 0
    ) {
      const alert = document.createElement('div');
      alert.className = 'alert alert-success';
      alert.innerHTML = 'Success to save!';
      bookForm.prepend(alert);
    }

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

// ----- local storage ----- //
class Storage {
  // 1. store a book
  static storeBook(book) {
    const { title, author, isbn } = book;
    const localStorageBooks = localStorage.getItem('books');
    if (!localStorageBooks) {
      let books = [];
      books.push({ title, author, isbn });
      localStorage.setItem('books', JSON.stringify(books));
    } else {
      let storedBooks = JSON.parse(localStorageBooks);
      storedBooks.push({ title, author, isbn });
      localStorage.setItem('books', JSON.stringify(storedBooks));
    }
  }
  // 2. remove a book
  static removeBook(e) {
    const title = e.target.parentElement.parentElement.firstChild.innerHTML;
    const bookLists = JSON.parse(localStorage.getItem('books'));

    const newBookLists = bookLists.filter((book) => {
      return book.title !== title;
    });

    localStorage.setItem('books', JSON.stringify(newBookLists));
  }
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

//Add a book
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;
  const book = [{ title, author, isbn }];

  UI.displayBook(book);
  UI.showAlert(book[0]);
  Storage.storeBook(book[0]);
});

//Remove
bookList.addEventListener('click', (e) => {
  UI.deleteBook(e);
  Storage.removeBook(e);
});
