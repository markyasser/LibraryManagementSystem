const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import the other models
const Book = require("./book");
const Borrower = require("./borrowers");

const BorrowedBook = sequelize.define(
  "BorrowedBook",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    borrowerId: { type: DataTypes.INTEGER, allowNull: false },
    borrowDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    returnDate: { type: DataTypes.DATE },
  },
  { tableName: "BorrowedBooks", timestamps: false }
);

// Define the associations between models
// In Book model
Book.hasMany(BorrowedBook, { foreignKey: "bookId" });
BorrowedBook.belongsTo(Book, { foreignKey: "bookId" });

// In Borrower model
Borrower.hasMany(BorrowedBook, { foreignKey: "borrowerId" });
BorrowedBook.belongsTo(Borrower, { foreignKey: "borrowerId" });

module.exports = BorrowedBook;
