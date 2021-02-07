//import User model
const User = require("../models/user.model.js");

//method to create a user with 2F authentication using Twilio and Sendgrid
const createUser = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    email,
    password,
    twoF: "not set",
  });

  //use and import what we need from Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  //generate authentication email
  client.verify
    .services("VAb409274cbe43aad440037a589570699c")
    .verifications.create({ to: email, channel: "email" })
    .then((verification) => {
      //set status of new user to pending
      newUser.twoF = verification.status;
      //save new user to database
      newUser
        .save()
        .then(() => res.json("User Added!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    });
};

//function to verify the authentication code of the user using Twilio and Sendgrid
const verifyTwoF = (req, res) => {
  const email = req.body.email;
  const code = req.body.code;

  console.log(email + " " + code)

  //use and import what we need from Twilio
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.verify
    .services("VAb409274cbe43aad440037a589570699c")
    .verificationChecks.create({ to: email, code: code })
    .then((verification_check) => {
      //update twoF attribute of user to approved and then save 
      const filter = { email: email };
      const update = { twoF: 'approved' };
      User.findOneAndUpdate(filter, update)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
    }).catch(err => res.json("Verification Failed!"))
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
  verifyTwoF,
};
