const Book = require("../models/book");
const { Op } = require("sequelize");

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

// Search for books by title, author, or ISBN
exports.searchBooks = async (req, res, next) => {
  try {
    const { title, author, ISBN } = req.query; // Get search parameters from query string

    // Build search criteria based on available query parameters
    const searchCriteria = {};
    if (title) {
      searchCriteria.title = { [Op.like]: `%${title}%` }; // Use LIKE for case-insensitive matching
    }
    if (author) {
      searchCriteria.author = { [Op.like]: `%${author}%` }; // Use LIKE for case-insensitive matching
    }
    if (ISBN) {
      searchCriteria.ISBN = { [Op.like]: `%${ISBN}%` }; // Use LIKE for case-insensitive matching
    }

    // Search for books based on criteria
    const books = await Book.findAll({ where: searchCriteria });

    // If no books found
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found matching the search criteria" });
    }

    res.status(200).json({ books });
  } catch (err) {
    next(err);
  }
};
