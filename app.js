require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const booksRoutes = require("./routes/booksRoutes");
const borrowersRoutes = require("./routes/borrowersRoutes");
const borrowedBookRoutes = require("./routes/borrowedBookRoutes");

const app = express();

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
