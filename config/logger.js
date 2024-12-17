// /middleware/logger.ts
const fs = require("fs");
const path = require("path");

// Create a write stream for logging to a file (ensure the log directory exists)
exports.logStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "access.log"),
  { flags: "a" }
);

// Custom morgan logging function
exports.customMorgan = (tokens, req, res) => {
  const isJson = req.is("application/json");
  const isFormData = req.is("multipart/form-data");
  const filesProvided = req.file ? "Yes" : "No";
  const authProvided = req.headers["authorization"] ? "Yes" : "No";

  return [
    tokens["remote-addr"](req, res), // IP address
    tokens.date(req, res, "clf"), // Date and time
    tokens.method(req, res), // HTTP method
    tokens.url(req, res), // Request URL
    `Auth Provided: ${authProvided}`, // Authorization presence
    `Request Type: ${isJson ? "JSON" : isFormData ? "FormData" : "other"}`, // Request type
    `Files Provided: ${filesProvided}`, // Whether files were uploaded
    tokens.status(req, res), // Response status code
    tokens["response-time"](req, res) + "ms", // Response time
  ].join(" | ");
};
