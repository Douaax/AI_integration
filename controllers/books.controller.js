const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/books.json');

// Helper: read books from JSON
function readBooks() {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
}

// Helper: write books to JSON
function writeBooks(books) {
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
}

// GET /books -> list all books
function getAllBooks(req, res) {
  const books = readBooks();
  res.json(books);
}

// GET /books/:id -> get one book
function getBookById(req, res) {
  const books = readBooks();
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) res.json(book);
  else res.status(404).json({ message: 'Book not found' });
}

// POST /books -> create a book
function createBook(req, res) {
  const books = readBooks();
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
}

// PUT /books/:id -> update a book
function updateBook(req, res) {
  const books = readBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    books[index].title = req.body.title || books[index].title;
    books[index].author = req.body.author || books[index].author;
    writeBooks(books);
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}

// DELETE /books/:id -> delete a book
function deleteBook(req, res) {
  let books = readBooks();
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    const deleted = books.splice(index, 1);
    writeBooks(books);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
