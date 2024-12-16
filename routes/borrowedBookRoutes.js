const express = require("express");
const borrowedBookController = require("../controllers/BorrowedBookController");

const router = express.Router();

/**
 * @swagger
 * /borrowedBooks:
 *   get:
 *     summary: Get all borrowed books
 *     description: Retrieves a list of all borrowed books with borrower details.
 *     tags: [BorrowedBooks]
 *     responses:
 *       200:
 *         description: List of all borrowed books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   bookId:
 *                     type: integer
 *                   borrowerId:
 *                     type: integer
 *                   borrowDate:
 *                     type: string
 *                     format: date-time
 *                   returnDate:
 *                     type: string
 *                     format: date-time
 *                   book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       availableQty:
 *                         type: integer
 *                   borrower:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get("/", borrowedBookController.getAllBorrowedBooks);

/**
 * @swagger
 * /borrowedBooks/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a borrower to borrow a book if it's available and not already borrowed.
 *     tags: [BorrowedBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - borrowerId
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID of the book to borrow.
 *               borrowerId:
 *                 type: integer
 *                 description: ID of the borrower who is borrowing the book.
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book borrowed successfully"
 *                 borrowedBook:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     bookId:
 *                       type: integer
 *                     borrowerId:
 *                       type: integer
 *                     borrowDate:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request, e.g., book unavailable or borrower already borrowed the book
 *       404:
 *         description: Book or borrower not found
 *       500:
 *         description: Internal server error
 */
router.post("/borrow", borrowedBookController.borrowBook);

/**
 * @swagger
 * /borrowedBooks/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a borrower to return a borrowed book.
 *     tags: [BorrowedBooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - borrowerId
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID of the book to return.
 *               borrowerId:
 *                 type: integer
 *                 description: ID of the borrower returning the book.
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book returned successfully"
 *                 borrowedBook:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     bookId:
 *                       type: integer
 *                     borrowerId:
 *                       type: integer
 *                     borrowDate:
 *                       type: string
 *                       format: date-time
 *                     returnDate:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: No active borrowing record found
 *       500:
 *         description: Internal server error
 */
router.post("/return", borrowedBookController.returnBook);

module.exports = router;
