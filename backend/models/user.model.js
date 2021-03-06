//require mongoose and schema
const mongoose = require("mongoose");

//create schema
const Schema = mongoose.Schema;

//create a new schema for a user
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    sentRequests: { type: Array },
    receivedRequests: { type: Array },
    partners: { type: Array },
    twoF: { type: String },
  },
  {
    timestamps: true,
  }
);

//set the user model and export it
const User = mongoose.model("User", userSchema);

module.exports = User;
