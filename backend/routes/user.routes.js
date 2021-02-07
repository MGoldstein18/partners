//import express, express router and the functions from the controller file
const express = require("express");
const router = express.Router();
const {
  createUser,
  sendRequest,
  acceptRequest,
  verifyTwoF,
} = require("../controllers/user.controller.js");

//set each function to a route
router.post("/add", createUser);
router.post("/send", sendRequest);
router.post("/accept", acceptRequest);
router.post('/verifytwof', verifyTwoF)

//export the router
module.exports = router;
