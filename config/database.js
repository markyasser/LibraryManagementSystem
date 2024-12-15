const { Sequelize } = require("sequelize");
const mysql = require("mysql2"); // For checking the existence of the database

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password", // Use your actual password here
});

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name to use after checking if exists
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

// Check if the database exists, if not, create it
connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (err, results) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database is ready or already exists");
    }
  }
);

module.exports = sequelize;
