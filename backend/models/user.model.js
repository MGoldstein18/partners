//require mongoose and schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create a new schema for a user
const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    sentRequests: { type: Array },
    receivedRequests: { type: Array },
    partners: { type: Array },
  },
  {
    timestamps: true,
  }
);

//set the user model and export it
const User = mongoose.model("User", userSchema);

module.exports = User;
