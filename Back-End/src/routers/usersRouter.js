const express = require("express");
const Users = require("../models/usersModel");
const routerUsers = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

routerUsers.post("/signup", async (req, res) => {
  const { name, email, password, city } = req.body;
  try {
    const userExist = await Users.findOne({ email: email });
    if (userExist) {
      return res.status(403).json({ message: "Email is Taken" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await new Users({
      name: name,
      email: email,
      password: hash,
      city: city,
    });
    await user.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(404).json({ message: "Failure" });
  }
});

routerUsers.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const fetchUser = await Users.findOne({ email: email });
    if (!fetchUser) {
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
      message: "failure",
    });
  }
});

module.exports = routerUsers;
