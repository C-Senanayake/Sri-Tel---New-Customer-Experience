const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
    includes: {
        type: String,
    },
    price: {
        type: String,
    }
},{timestamps: true});

const Service = mongoose.model("Service",ServiceSchema);

module.exports = Service;