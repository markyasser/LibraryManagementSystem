const express = require("express");
const borrowersController = require("../controllers/BorrowersController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Borrower:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the borrower.
 *         name:
 *           type: string
 *           description: The name of the borrower.
 *         email:
 *           type: string
 *           description: The email address of the borrower.
 *         regDate:
 *           type: string
 *           format: date-time
 *           description: The registration date of the borrower.
 *           default: "2024-12-16T12:00:00Z"
 *       required:
 *         - name
 *         - email
 *       example:
 *         id: 5
 *         name: "John Doe"
 *         email: "john.doe@example.com"
 *         regDate: "2024-12-16T12:00:00Z"
 */

/**
 * @swagger
 * /borrowers:
 *   get:
 *     summary: Get all borrowers
 *     description: Retrieves a list of all borrowers in the system.
 *     operationId: getAllBorrowers
 *     tags:
 *       - Borrowers
 *     responses:
 *       200:
 *         description: A list of borrowers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 borrowers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Borrower'
 *       404:
 *         description: No borrowers found
 */
router.get("/", borrowersController.getAllBorrowers);

/**
 * @swagger
 * /borrowers:
 *   post:
 *     summary: Create a new borrower
 *     description: Creates a new borrower in the system.
 *     operationId: createBorrower
 *     tags:
 *       - Borrowers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the borrower.
 *               email:
 *                 type: string
 *                 description: Email of the borrower.
 *     responses:
 *       201:
 *         description: Borrower created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrower'
 *       400:
 *         description: Invalid request body
 */
router.post("/", borrowersController.createBorrower);

/**
 * @swagger
 * /borrowers/{id}:
 *   put:
 *     summary: Update a borrower
 *     description: Updates the information of an existing borrower by their ID.
 *     operationId: updateBorrower
 *     tags:
 *       - Borrowers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the borrower to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the borrower.
 *               email:
 *                 type: string
 *                 description: Email of the borrower.
 *     responses:
 *       200:
 *         description: Borrower updated successfully
 *       404:
 *         description: Borrower not found
 */
router.put("/:id", borrowersController.updateBorrower);

/**
 * @swagger
 * /borrowers/{id}:
 *   delete:
 *     summary: Delete a borrower
 *     description: Deletes an existing borrower by their ID.
 *     operationId: deleteBorrower
 *     tags:
 *       - Borrowers
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the borrower to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Borrower deleted successfully
 *       404:
 *         description: Borrower not found
 */
router.delete("/:id", borrowersController.deleteBorrower);

module.exports = router;
