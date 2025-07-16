const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).send("Error fetching employees");
    res.json(result);
  });
});

// Add new employee
router.post("/", (req, res) => {
  const { name, email, department, salary } = req.body;
  db.query(
    "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)",
    [name, email, department, salary],
    (err, result) => {
      if (err) return res.status(500).send("Failed to add employee");
      res.send("Employee added");
    }
  );
});

// Update employee
router.put("/:id", (req, res) => {
  const { name, email, department, salary } = req.body;
  db.query(
    "UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?",
    [name, email, department, salary, req.params.id],
    (err, result) => {
      if (err) return res.status(500).send("Failed to update employee");
      res.send("Employee updated");
    }
  );
});

// Delete employee
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).send("Failed to delete employee");
    res.send("Employee deleted");
  });
});

module.exports = router;
