const User = require("../models/user.model.js");

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

const sendRequest = (req, res) => {
  const email = req.body.email;
  const partnerEmail = req.body.partnerEmail;

  const filter = { email: email };
  const update = {
    $push: {
      sentRequests: {
        email: partnerEmail,
      },
    },
  };

  User.findOneAndUpdate(filter, update)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));

  const partnerFilter = { email: partnerEmail };
  const partnerUpdate = {
    $push: {
      receivedRequests: {
        email: email,
      },
    },
  };

  User.findOneAndUpdate(partnerFilter, partnerUpdate)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

const acceptRequest = (req, res) => {
  const email = req.body.email;
  const partnerEmail = req.body.partnerEmail;

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

  User.findOneAndUpdate(filter, update)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));

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

  User.findOneAndUpdate(partnerFilter, partnerUpdate)
    .then((user) => {
      console.log(user);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
};

module.exports = {
  createUser,
  sendRequest,
  acceptRequest
};
