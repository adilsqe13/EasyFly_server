const mongoose = require('mongoose');
const { Schema } = mongoose;


const AdminFlightSchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    flightNumber: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    seating_capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('flights', AdminFlightSchema);