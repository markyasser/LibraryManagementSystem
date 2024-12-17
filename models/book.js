const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define(
  "Book",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    ISBN: { type: DataTypes.STRING, unique: true, allowNull: false },
    available_qty: { type: DataTypes.INTEGER, defaultValue: 0 },
    location: { type: DataTypes.STRING },
  },
  { tableName: "Books", timestamps: false }
);

module.exports = Book;
