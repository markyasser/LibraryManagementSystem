const BookLoans = require("../models/bookLoans");
const Book = require("../models/book");
const Borrower = require("../models/borrowers");
const Sequelize = require("sequelize");
const { Op } = require("sequelize"); // Ensure you are importing Op from Sequelize

// Borrow a book
exports.borrowBook = async (req, res) => {
  const { bookId, borrowerId, dueDate } = req.body;

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
    const isBorrowed = await BookLoans.findOne({
      where: { bookId, borrowerId, returnDate: null },
    });

    if (isBorrowed) {
      return res
        .status(400)
        .json({ message: "You have already borrowed this book" });
    }

    // Create a borrowed book entry
    const bookLoan = await BookLoans.create({
      bookId,
      borrowerId,
      dueDate: dueDate,
      borrowDate: new Date(),
    });

    // Decrement the available quantity of the book
    book.availableQty -= 1;
    await book.save();

    return res.status(201).json({
      message: "Book borrowed successfully",
      BookLoan: bookLoan,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  const { bookId, borrowerId } = req.body;
  try {
    // Find the borrowed book entry
    const bookLoan = await BookLoans.findOne({
      where: { bookId, borrowerId, return_date: null },
    });

    if (!bookLoan) {
      return res
        .status(404)
        .json({ message: "No active borrowing record found" });
    }

    // Update the return date
    bookLoan.returnDate = new Date();
    await bookLoan.save();

    // Increment the available quantity of the book
    const book = await Book.findByPk(bookId);
    if (book) {
      book.availableQty += 1;
      await book.save();
    }

    return res.status(200).json({
      message: "Book returned successfully",
      BookLoan: bookLoan,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

exports.getAllBookLoans = async (req, res) => {
  try {
    const bookLoans = await BookLoans.findAll({
      include: [Book, Borrower],
    });

    return res.status(200).json({ BookLoans: bookLoans });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

exports.getBorrowerBooks = async (req, res) => {
  const { borrowerId } = req.params;

  try {
    // Check if the borrower exists
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    const bookLoans = await BookLoans.findAll({
      where: { borrowerId },
      include: [Book],
    });

    return res.status(200).json(bookLoans);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

exports.getOverdueBorrows = async (req, res) => {
  const { months } = req.body;
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the start date based on the number of months
    const startDate = new Date();
    startDate.setMonth(currentDate.getMonth() - months);

    const overdueBorrows = await BookLoans.findAll({
      where: {
        // The borrow is either overdue (returnDate is null and current date > dueDate)
        [Op.or]: [
          {
            dueDate: {
              [Op.lt]: currentDate, // current date > dueDate
            },
            returnDate: null,
          },
          {
            returnDate: {
              [Op.gt]: Sequelize.col("dueDate"), // return date > due date
            },
          },
        ],
        // Only include borrows from the last 'months' months
        borrowDate: {
          [Op.gt]: startDate, // filter borrows created in the last 'months' months
        },
      },
      include: [Book, Borrower],
    });

    return res.status(200).json(overdueBorrows);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message:
        "A database error occurred while processing your request. Please check the request body and try again.",
    });
  }
};
