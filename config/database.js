const { Sequelize } = require("sequelize");
const mysql = require("mysql2"); // For checking the existence of the database

// MySQL connection for database creation
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root", // Use your actual password here
});

// Create the database if it doesn't exist
async function createDatabase() {
  return new Promise((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
      (err, results) => {
        if (err) {
          console.error("Error creating database:", err);
          reject(err);
        } else {
          console.log("Database is ready or already exists");
          resolve(results);
        }
      }
    );
  });
}

// Function to wait for MySQL to be ready
async function waitForMySQL() {
  let connected = false;
  while (!connected) {
    try {
      // Try to connect to the MySQL server
      await new Promise((resolve, reject) => {
        connection.ping((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      console.log("MySQL is ready!");
      connected = true;
    } catch (error) {
      console.error("Waiting for MySQL to be ready...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Retry after 5 seconds
    }
  }
}

// Main function to handle the DB setup
async function setupDatabase() {
  try {
    await waitForMySQL();
    await createDatabase(); // Create the database if needed
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

setupDatabase();

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
