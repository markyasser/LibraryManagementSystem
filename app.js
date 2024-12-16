require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const rateLimit = require("express-rate-limit");
const booksRoutes = require("./routes/booksRoutes");
const borrowersRoutes = require("./routes/borrowersRoutes");
const borrowedBookRoutes = require("./routes/borrowedBookRoutes");

const app = express();

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Apply the rate limiting middleware globally
app.use(limiter);

app.use(bodyParser.json());

app.use("/books", booksRoutes);
app.use("/borrowers", borrowersRoutes);
app.use("/borrowedBooks", borrowedBookRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

// Sync database and start server
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => console.error(err));
