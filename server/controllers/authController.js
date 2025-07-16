const bcrypt = require("bcrypt");
const db = require("../db");
const registerUser =  async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hash],
    (err, result) => {
      if (err) return res.status(500).send("Registration failed");
      res.send("User registered");
    }
  );
};


const  loginUser = async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).send("Server error");
      if (result.length === 0) return res.status(401).send("User not found");

      const user = result[0];
      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) return res.status(401).send("Invalid password");

      // Set session
      req.session.user = {
        id: user.id,
        username: user.username
      };

      res.send({ message: "Login successful", user: req.session.user });
    }
  );
};


const  auth =  (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};


const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send("Logout failed");
    res.clearCookie("userId");
    res.send("Logged out");
  });
};


module.exports ={registerUser, loginUser, auth, logout};