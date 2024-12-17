const express = require("express");
const bookLoansController = require("../controllers/BookLoansController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     BookLoans:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the borrowed book entry.
 *         bookId:
 *           type: integer
 *           description: The ID of the book being borrowed.
 *         borrowerId:
 *           type: integer
 *           description: The ID of the borrower who borrowed the book.
 *         borrowDate:
 *           type: string
 *           format: date-time
 *           description: The date when the book was borrowed.
 *           default: "2024-12-16T12:00:00Z"
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: The date when the book is due to be returned.
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: The date when the book was returned.
 *       required:
 *         - bookId
 *         - borrowerId
 *       example:
 *         id: 1
 *         bookId: 101
 *         borrowerId: 5
 *         borrowDate: "2024-12-16T12:00:00Z"
 *         dueDate: "2024-12-30T12:00:00Z"
 *         returnDate: "2024-12-20T12:00:00Z"
 *
 */

/**
 * @swagger
 * /bookLoans:
 *   get:
 *     summary: Get all borrowed books
 *     description: Retrieves a list of all borrowed books with borrower details.
 *     tags: [BookLoans]
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
router.get("/", bookLoansController.getAllBookLoans);
/**
 * @swagger
 * /bookLoans/{borrowerId}:
 *   get:
 *     summary: Get all borrowed books by a specific borrower
 *     description: Retrieves a list of all books borrowed by a specific borrower.
 *     tags: [BookLoans]
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of books borrowed by the borrower
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID of the borrowed book entry
 *                   bookId:
 *                     type: integer
 *                     description: ID of the borrowed book
 *                   borrowerId:
 *                     type: integer
 *                     description: ID of the borrower
 *                   borrowDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the book was borrowed
 *                   returnDate:
 *                     type: string
 *                     format: date-time
 *                     description: The date the book was returned (if applicable)
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     description: The due date for returning the book
 *                   book:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID of the book
 *                       title:
 *                         type: string
 *                         description: Title of the book
 *                       author:
 *                         type: string
 *                         description: Author of the book
 *                       availableQty:
 *                         type: integer
 *                         description: Available quantity of the book
 *                   borrower:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID of the borrower
 *                       name:
 *                         type: string
 *                         description: Name of the borrower
 *       404:
 *         description: Borrower not found
 *       500:
 *         description: Internal server error
 */
router.get("/:borrowerId", bookLoansController.getBorrowerBooks);

/**
 * @swagger
 * /bookLoans/overdue:
 *   post:
 *     summary: Get all overdue borrows based on due date and return date
 *     description: Fetches borrows where the `returnDate` is either null and the current date is greater than the `dueDate`, or the `returnDate` is greater than the `dueDate`. Optionally, you can filter by the number of months.
 *     tags: [BookLoans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               months:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: A list of overdue borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   dueDate:
 *                     type: string
 *                     format: date
 *                   returnDate:
 *                     type: string
 *                     format: date
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
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
 *                   borrower:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       400:
 *         description: Bad Request. Missing or invalid parameters.
 *       500:
 *         description: Internal Server Error. Something went wrong on the server side.
 */
router.post("/overdue", bookLoansController.getOverdueBorrows);

/**
 * @swagger
 * /bookLoans/borrow:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a borrower to borrow a book if it's available and not already borrowed.
 *     tags: [BookLoans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bookId
 *               - borrowerId
 *               - dueDate
 *             properties:
 *               bookId:
 *                 type: integer
 *                 description: ID of the book to borrow.
 *               borrowerId:
 *                 type: integer
 *                 description: ID of the borrower who is borrowing the book.
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date for returning the book.
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
 *                     returnDate:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Bad request, e.g., book unavailable or borrower already borrowed the book
 *       404:
 *         description: Book or borrower not found
 *       500:
 *         description: Internal server error
 */
router.post("/borrow", bookLoansController.borrowBook);

/**
 * @swagger
 * /bookLoans/return:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a borrower to return a borrowed book.
 *     tags: [BookLoans]
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
 *                     dueDate:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: No active borrowing record found
 *       500:
 *         description: Internal server error
 */
router.post("/return", bookLoansController.returnBook);

module.exports = router;
