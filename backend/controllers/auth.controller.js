const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const User = require("../models/user.model.js");

app.use(express.json());

const auth = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userValid = await User.find({ email: email });

  if (!userValid) {
    res.status(403).json("Invalid Email!");
  } else if (userValid[0].password !== password) {
    res.status(403).json("Invalid Password!");
  } else {
    const payload = {
      id: userValid[0]._id,
    };
    const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
      algorithm: "HS256",
    });
    res.json(token);
  }
};

module.exports = {
  auth,
};
