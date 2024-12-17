require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const rateLimit = require("express-rate-limit");
const booksRoutes = require("./routes/booksRoutes");
const borrowersRoutes = require("./routes/borrowersRoutes");
const bookLoanRoutes = require("./routes/bookLoanRoutes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const { customMorgan, logStream } = require("./config/logger"); // Import the custom logger
const app = express();

// Use the custom logger
app.use(morgan(customMorgan, { stream: logStream }));

// CORS configuration to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

const currentHost = process.env.HOST || "localhost";
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API for managing books, borrowers, and borrowed books",
    },
    servers: [
      {
        url: "http://" + currentHost + ":5000", // Test server (Staging)
      },
      {
        url: "http://localhost:5000", // Local server (Development)
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
app.use("/bookLoans", bookLoanRoutes);

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
