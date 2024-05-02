const books = [
    { id: 1, title: "The Lord of The Rings", author: "J.R.R Tol"},
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen"},
];

class Book {
    constructor(id, title, author) {
      this.id = id;
      this.title = title;
      this.author = author;
    }
  
    // ... methods for CRUD operations (explained later)

    // when this function is called, the books will be printed out
    static async getAllBooks() {
        return books;
    } 

    static async getBookById(id) {
        const books = await this.getAllBooks();
        const book = book.find((book) => book.id === id);
        return book;
    }

    static async createBook(newBookData) {
        const books = await this.getAllBooks();
        // must be according to the constructor
        // I think calling out getAllBooks() to get the number of books
        const newBook = new Book(
            books.length + 1,
            newBookData.title,
            newBookData.author
        );
        books,push(newBook);
        return newBook;
    }

    // false will return -1
    // will return element of the book id
    static async updateBook(id, newBookData) {
        const books = await this.getAllBooks();
        const existingBookIndex = books.findIndex((book) => book.id === id);
        if (exisitingBookIndex === -1) {
            return null;
        }
        const updatedBook = {
            ...books[existingBookIndex], // old data
            ...newBookData, // new data that will overwrite the old data ^
    };
    books[existingBookIndex] = updatedBook; // overwriting
    return updatedBook;
    }

    static async deleteBook(id) {
        const books = await this.getAllBooks(); // Await the promise to get books
        const bookIndex = books.findIndex((book) => book.id === id);
        if (bookIndex === -1) {
          return false; // Indicate book not found
        }
    
        // Replace this with your actual logic to delete the book from the data source (e.g., database)
        books.splice(bookIndex, 1);
        return true;
      }
  }
  
  module.exports = Book;