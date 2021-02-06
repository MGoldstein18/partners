const express = require("express");
const router = express.Router();
const {
  createUser,
  sendRequest,
  acceptRequest,
} = require("../controllers/user.controller.js");

router.post("/add", createUser);
router.post("/send", sendRequest);
router.post("/accept", acceptRequest);

module.exports = router;
