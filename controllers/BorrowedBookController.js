const BorrowedBook = require("../models/borrowedBook");
const Book = require("../models/book");
const Borrower = require("../models/borrowers");

// Borrow a book
exports.borrowBook = async (req, res) => {
  const { bookId, borrowerId } = req.body;

  try {
    // Check if the book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the book is available
    if (book.availableQty <= 0) {
      return res.status(400).json({ message: "Book is currently unavailable" });
    }

    // Check if the borrower exists
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    // Check if the book is already borrowed by this borrower and not returned
    const isBorrowed = await BorrowedBook.findOne({
      where: { bookId, borrowerId, returnDate: null },
    });

    if (isBorrowed) {
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    // Create a borrowed book entry
    const borrowedBook = await BorrowedBook.create({
      bookId,
      borrowerId,
      borrowDate: new Date(),
    });

    // Decrement the available quantity of the book
    book.availableQty -= 1;
    await book.save();

    return res.status(201).json({
      message: "Book borrowed successfully",
      borrowedBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  const { bookId, borrowerId } = req.body;

  try {
    // Find the borrowed book entry
    const borrowedBook = await BorrowedBook.findOne({
      where: { bookId, borrowerId, returnDate: null },
    });

    if (!borrowedBook) {
      return res
        .status(404)
        .json({ message: "No active borrowing record found" });
    }

    // Update the return date
    borrowedBook.returnDate = new Date();
    await borrowedBook.save();

    // Increment the available quantity of the book
    const book = await Book.findByPk(bookId);
    if (book) {
      book.availableQty += 1;
      await book.save();
    }

    return res.status(200).json({
      message: "Book returned successfully",
      borrowedBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll({
      include: [Book, Borrower],
    });

    return res.status(200).json(borrowedBooks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
