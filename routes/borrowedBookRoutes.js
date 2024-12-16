const express = require("express");
const borrowedBookController = require("../controllers/BorrowedBookController");

const router = express.Router();

router.get("/", borrowedBookController.getAllBorrowedBooks);
router.post("/borrow", borrowedBookController.borrowBook);
router.post("/return", borrowedBookController.returnBook);

module.exports = router;
