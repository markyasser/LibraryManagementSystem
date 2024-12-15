const { DataTypes } = require("sequelize");

const Book = sequelize.define(
  "Book",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    author: { type: DataTypes.STRING, allowNull: false },
    ISBN: { type: DataTypes.STRING, unique: true, allowNull: false },
    availableQty: { type: DataTypes.INTEGER, defaultValue: 0 },
    location: { type: DataTypes.STRING },
  },
  { tableName: "Books", timestamps: false }
);

module.exports = Book;
