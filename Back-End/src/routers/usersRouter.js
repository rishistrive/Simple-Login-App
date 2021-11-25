const express = require("express");
const routerUsers = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db/conn");

routerUsers.post("/signup", async (req, res) => {
  const { name, email, password, city } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (rows[0]) {
      return res.status(403).json({ message: "Email is Taken" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await pool.query("INSERT INTO users (name, email, password, city) VALUES($1, $2, $3, $4)", [name, email, hash, city]);
    
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(404).json({ message: "Failure", err: err });
  }
});

routerUsers.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const fetchUser = rows[0];

    if (!rows[0]) {
      return res.status(401).json({
        message: "Auth failed no such user",
      });
    }
    const checkPassword = await bcrypt.compare(password, fetchUser.password);
    if (!checkPassword) {
      return res.status(401).json({
        message: "Auth failed incorrect password",
      });
    }
    const token = jwt.sign(
      { email: fetchUser.email, userId: fetchUser._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      name: fetchUser.name,

      message: "Login Successfully",
    });
  } catch (err) {
    res.status(404).json({
      message: "failure", err: err
    });
  }
});

module.exports = routerUsers;
