const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");

require("dotenv").config();

app.use(helmet());

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user.routes.js");

app.use("/user", userRoutes);

const uri = process.env.uri;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Database!"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
