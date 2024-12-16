const express = require("express");
const booksController = require("../controllers/BooksController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         ISBN:
 *           type: string
 *           description: The ISBN of the book.
 *         availableQty:
 *           type: integer
 *           description: The quantity of books available in the library.
 *           default: 0
 *         location:
 *           type: string
 *           description: The location of the book in the library.
 *       required:
 *         - title
 *         - author
 *         - ISBN
 *       example:
 *         id: 1
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         ISBN: "9780743273565"
 *         availableQty: 10
 *         location: "Shelf 3A"
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Add a new book with details like title, author, ISBN, available quantity, and shelf location.
 *     tags:
 *      - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - ISBN
 *               - availableQty
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               ISBN:
 *                 type: string
 *                 description: The ISBN of the book.
 *               availableQty:
 *                 type: integer
 *                 description: The available quantity of the book.
 *               location:
 *                 type: string
 *                 description: The shelf location of the book.
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book created"
 *                 book:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     ISBN:
 *                       type: string
 *                     availableQty:
 *                       type: integer
 *                     location:
 *                       type: string
 *       400:
 *         description: Invalid input
 */
router.post("/", booksController.createBook); // title, author, ISBN, available quantity, and shelf location.

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books in the library.
 *     tags:
 *      - Books
 *     responses:
 *       200:
 *         description: A list of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       ISBN:
 *                         type: string
 *                       availableQty:
 *                         type: integer
 *                       location:
 *                         type: string
 */
router.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Update the details of an existing book by its ID.
 *     tags:
 *      - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               author:
 *                 type: string
 *                 description: The author of the book.
 *               ISBN:
 *                 type: string
 *                 description: The ISBN of the book.
 *               availableQty:
 *                 type: integer
 *                 description: The available quantity of the book.
 *               location:
 *                 type: string
 *                 description: The shelf location of the book.
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", booksController.updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Delete a book by its ID from the library.
 *     tags:
 *      - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to be deleted
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete("/:id", booksController.deleteBook);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search for books by title, author, or ISBN
 *     description: Search for books in the library by title, author, or ISBN using query parameters.
 *     tags:
 *      - Books
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Title of the book.
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         required: false
 *         description: Author of the book.
 *         schema:
 *           type: string
 *       - in: query
 *         name: ISBN
 *         required: false
 *         description: ISBN of the book.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of books matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       ISBN:
 *                         type: string
 *                       availableQty:
 *                         type: integer
 *                       location:
 *                         type: string
 *       404:
 *         description: No books found matching the search criteria
 */
router.get("/search", booksController.searchBooks);

module.exports = router;
