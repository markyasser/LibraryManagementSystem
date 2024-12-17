# Library Management System

This is a **Node.js** and **Express** based backend project for a **Library Management System**. The application uses **MySQL** as the database and includes **Swagger** documentation for the RESTful API.

The system supports management of:

- Books
- Borrowers
- Borrowing and returning books  
  Additionally, access logs are saved for all incoming API requests.

The app is **containerized using Docker**, with a **Docker Compose** file for orchestrating both the application and the MySQL database.  
A test server has been deployed on **Azure**, and the Swagger API documentation is available at:  
[http://172.161.88.247:5000/api-docs/](http://172.161.88.247:5000/api-docs/)

---

## Features

### Endpoints Overview

| **Resource**   | **Endpoint**     | **Description**                  |
| -------------- | ---------------- | -------------------------------- |
| Books          | `/books`         | CRUD operations for books        |
| Borrowers      | `/borrowers`     | CRUD operations for borrowers    |
| Borrowed Books | `/BorrowedBooks` | Manage borrowing/returning books |

### Access Logs

- Every incoming API request is logged to maintain request history for auditing.

---

## Project Structure

```plaintext
/library-management
│
├── controllers/        # Contains route controllers (business logic)
├── models/             # Database models for MySQL
├── routes/             # API route definitions
├── middleware/         # Request logging middleware
├── config/             # Database configuration and Custom Logger setup
├── Dockerfile          # Docker image configuration
├── docker-compose.yml  # Docker Compose for app + MySQL
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
├── .env                # Environment variables
├── install.sh          # Script to install docker dependencies on test server
└── wait-for-it.sh      # Script to wait for MySQL container to be ready
```
