const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookedFlightSchema = new Schema({
    userId: {
        type: String,
        ref: 'user'
    },
    flightId: {
        type: String,
        required: true
    },
    flight: {
        type: Object,
        required: true,
    },
    person: {
        type: Number,
        required:true,
    },
    date: {
        type: Date,
        required:true,
    },
    amount: {
        type: Number,
        default: function () {
            return this.person * this.flight[0].price;
        },
    },
    booking_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('booked-flights', BookedFlightSchema);