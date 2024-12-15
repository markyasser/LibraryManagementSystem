const Borrower = require("../models/borrowers");

// Create a new borrower
exports.createBorrower = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newBorrower = await Borrower.create({ name, email });
    res
      .status(201)
      .json({ message: "Borrower created", borrower: newBorrower });
  } catch (err) {
    next(err);
  }
};

// Get all borrowers
exports.getAllBorrowers = async (req, res, next) => {
  try {
    const borrowers = await Borrower.findAll();
    res.status(200).json({ borrowers });
  } catch (err) {
    next(err);
  }
};

// Update a borrower
exports.updateBorrower = async (req, res, next) => {
  try {
    const borrowerId = req.params.id;
    const updatedData = req.body;

    const [updated] = await Borrower.update(updatedData, {
      where: { id: borrowerId },
    });
    if (updated) {
      res.status(200).json({ message: "Borrower updated" });
    } else {
      res.status(404).json({ message: "Borrower not found" });
    }
  } catch (err) {
    next(err);
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
    next(err);
  }
};
