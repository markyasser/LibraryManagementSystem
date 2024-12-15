const Book = require("../models/book");

// Create a new book
exports.createBook = async (req, res, next) => {
  try {
    const { author, ISBN, availableQty, location } = req.body;
    const newBook = await Book.create({ author, ISBN, availableQty, location });
    res.status(201).json({ message: "Book created", book: newBook });
  } catch (err) {
    next(err);
  }
};

// Get all books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};

// Update a book
exports.updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const [updated] = await Book.update(updatedData, { where: { id: bookId } });
    if (updated) {
      res.status(200).json({ message: "Book updated" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    next(err);
  }
};

// Delete a book
exports.deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.destroy({ where: { id: bookId } });

    if (deleted) {
      res.status(200).json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    next(err);
  }
};
