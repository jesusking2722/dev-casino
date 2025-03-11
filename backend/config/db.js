const mysql = require("mysql2");
require("dotenv").config();

// Create a connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// Handle disconnections gracefully
process.on("SIGINT", () => {
  connection.end((err) => {
    console.log("Disconnected from the database.");
    process.exit(err ? 1 : 0);
  });
});

module.exports = db;
