const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Minimum password length is 6 characters"]
    }
});


// Mongoose hooks
// A function that fires before every save action
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    // This refers to actual user 
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }); // {email: email}
    if (user) {
        const auth = await bcrypt.compare(password, user.password) //(plain text password, hashed password)
        if (auth) {
            return user;
        }
        throw Error("Incorrect password");
    }

    throw Error("Incorrect email");

}

const User = mongoose.model('User', userSchema);

module.exports = User;