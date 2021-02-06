const User = require("../models/user.model.js")

const createUser = (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const newUser = new User({
        email, 
        password
    })

    newUser.save().then(() => res.json("User Added!")).catch(err => res.status(400).json(`Error: ${err}`))
}

module.exports = {
    createUser,
}