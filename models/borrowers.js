const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Borrower = sequelize.define(
  "Borrower",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    regDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "Borrowers", timestamps: false }
);

module.exports = Borrower;
