const express = require("express");
const borrowersController = require("../controllers/BorrowersController");

const router = express.Router();

router.post("/", borrowersController.createBorrower);
router.get("/", borrowersController.getAllBorrowers);
router.put("/:id", borrowersController.updateBorrower);
router.delete("/:id", borrowersController.deleteBorrower);

module.exports = router;
