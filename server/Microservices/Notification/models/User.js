const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
    },
    includes: {
        type: String,
    },
    price: {
        type: String,
    }
});

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        // required: true,
    },
    activePackages: {
        type: [ServiceSchema] ,
        default: [],
    },
    email_active: {
        type: Boolean,
        default: false,
    },
phone_active: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

const User = mongoose.model("User",UserSchema);

module.exports = User;