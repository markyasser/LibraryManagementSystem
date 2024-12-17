const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Import the other models
const Book = require("./book");
const Borrower = require("./borrowers");

const BookLoans = sequelize.define(
  "BookLoans",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    borrower_id: { type: DataTypes.INTEGER, allowNull: false },
    borrow_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    due_date: { type: DataTypes.DATE },
    return_date: { type: DataTypes.DATE },
  },
  { tableName: "BookLoans", timestamps: false }
);

// Define the associations between models
// In Book model
Book.hasMany(BookLoans, { foreignKey: "bookId" });
BookLoans.belongsTo(Book, { foreignKey: "bookId" });

// In Borrower model
Borrower.hasMany(BookLoans, { foreignKey: "borrowerId" });
BookLoans.belongsTo(Borrower, { foreignKey: "borrowerId" });

module.exports = BookLoans;
