const express = require("express");
const router = express.Router();


//User model
const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
    let errors = {
        email: "",
        password: "",
    }
    // Incorrect email
    if (err.message === "Incorrect email") {
        errors.email = "Email is incorrect";
        return errors;
    }

    // Incorrect password
    if (err.message === "Incorrect password") {
        errors.password = "Password is incorrect";
        return errors;
    }

    // Duplicate email
    if (err.code === 11000) {
        errors.email = "This email is already used";
        return errors;
    }

    // Validation errors
    if (err.errors.email ) {
        errors.email = err.errors.email.properties.message;
    }
    if (err.errors.password) {
        errors.password = err.errors.password.properties.message;
    }
    return errors;

}


router.post("/signup", (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(response => res.json(response))
        .catch(err => res.status(400).json(handleErrors(err)))
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        res.status(200).json({ user: user._id });
    } catch (err) {
        res.status(400).json(handleErrors(err));
    }


})

module.exports = router;