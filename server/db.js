// server/db.js
const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_db"
});

db.connect(err => {
  if (err) {
    console.error("DB connection error:", err);
    throw err;
  }
  console.log("MySQL Connected!");
});

module.exports = db;
