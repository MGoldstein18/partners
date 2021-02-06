//import User model
const User = require("../models/user.model.js");

//method to create a user
const createUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    email,
    password,
  });

  newUser
    .save()
    .then(() => res.json("User Added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//method to send a partner request
const sendRequest = (req, res) => {
  const email = req.body.email; //user who is sending the request
  const partnerEmail = req.body.partnerEmail; //user receiving the request

  //create filter and update for the user who is sending the request
  const filter = { email: email };
  const update = {
    $push: {
      sentRequests: {
        email: partnerEmail,
      },
    },
  };

  //update the user who is sending the request
  User.findOneAndUpdate(filter, update)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));

  //create filter and update for user who is receiving the request
  const partnerFilter = { email: partnerEmail };
  const partnerUpdate = {
    $push: {
      receivedRequests: {
        email: email,
      },
    },
  };

  //update user who is receiving the request
  User.findOneAndUpdate(partnerFilter, partnerUpdate)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//function to accept a partner request
const acceptRequest = (req, res) => {
  const email = req.body.email; //user who is accepting the request
  const partnerEmail = req.body.partnerEmail; //user who sent the request

  //create filter and update for user who is accepting the request
  const filter = { email: email };
  const update = {
    $push: {
      partners: {
        email: partnerEmail,
      },
    },
    $pull: {
      receivedRequests: {
        email: partnerEmail,
      },
    },
  };

  //update the user who is accepting the request
  User.findOneAndUpdate(filter, update)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));

  //create filter and update for user who sent the request
  const partnerFilter = { email: partnerEmail };
  const partnerUpdate = {
    $push: {
      partners: {
        email: email,
      },
    },
    $pull: {
      sentRequests: {
        email: email,
      },
    },
  };

  //update the user who sent the request
  User.findOneAndUpdate(partnerFilter, partnerUpdate)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

//export the functions
module.exports = {
  createUser,
  sendRequest,
  acceptRequest,
};
