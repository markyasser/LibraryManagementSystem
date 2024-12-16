const express = require("express");
const borrowedBookController = require("../controllers/BorrowedBookController");

const router = express.Router();

// Borrow a book
router.post("/borrow", borrowedBookController.borrowBook);

// Return a book
router.post("/return", borrowedBookController.returnBook);

module.exports = router;
