const express = require("express");
const booksController = require("../controllers/BooksController");

const router = express.Router();

router.post("/", booksController.createBook);
router.get("/", booksController.getAllBooks);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);
router.get("/search", booksController.searchBooks);

module.exports = router;
