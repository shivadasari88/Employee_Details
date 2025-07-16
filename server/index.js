const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./db"); 


const app = express();
app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
  key: "userId",
  secret: "1524648521",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24, // 1 day
  }
}));


app.use('/',require('./routes/authRoutes'));
app.use("/employees", require("./routes/employeeRoutes"));


app.get("/", (req, res) => {
  res.send("Employee Portal Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


