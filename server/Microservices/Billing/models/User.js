const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    telephone: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    email_active: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

const User = mongoose.model("User",UserSchema);

module.exports = User;