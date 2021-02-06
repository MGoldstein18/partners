const express = require("express");
const router = express.Router();
const {
  createUser,
  sendRequest,
} = require("../controllers/user.controller.js");

router.post("/add", createUser);
router.post("/send", sendRequest);

module.exports = router;
