//import express, cors, mongoose, dotenv, helmet
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");

//configure donenv
require("dotenv").config();

//use helmet
app.use(helmet());

//use cors and express middleware
app.use(cors());
app.use(express.json());

//get and use user routes
const userRoutes = require("./routes/user.routes.js");

app.use("/user", userRoutes);

//get uri from dotenv file
const uri = process.env.uri;

//connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Database!"));

//start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
