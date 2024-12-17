const Borrower = require("../models/borrowers");

// Create a new borrower
exports.createBorrower = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    // Check if the borrower already exists
    const existingBorrower = await Borrower.findOne({ where: { email } });
    if (existingBorrower) {
      return res.status(400).json({ message: "This Borrower already exists" });
    }
    const newBorrower = await Borrower.create({ name, email });
    res
      .status(201)
      .json({ message: "Borrower created", borrower: newBorrower });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

// Get all borrowers
exports.getAllBorrowers = async (req, res, next) => {
  try {
    const borrowers = await Borrower.findAll();
    res.status(200).json({ borrowers });
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

// Update a borrower
exports.updateBorrower = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const updatedData = req.body;

    // Check if the borrower exists
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    // Check if the email is already taken
    if (updatedData.email) {
      const existingBorrower = await Borrower.findOne({
        where: { email: updatedData.email },
      });
      if (existingBorrower && existingBorrower.id != borrowerId) {
        return res.status(400).json({ message: "This email is already taken" });
      }
    }

    const [updated] = await Borrower.update(updatedData, {
      where: { id: borrowerId },
    });
    if (updated) {
      res.status(200).json({ message: "Borrower updated" });
    } else {
      res.status(404).json({ message: "Borrower not found" });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};

// Delete a borrower
exports.deleteBorrower = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const deleted = await Borrower.destroy({ where: { id: borrowerId } });

    if (deleted) {
      res.status(200).json({ message: "Borrower deleted" });
    } else {
      res.status(404).json({ message: "Borrower not found" });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "A database error occurred while processing your request.",
    });
  }
};
