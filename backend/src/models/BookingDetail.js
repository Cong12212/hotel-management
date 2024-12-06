// models/BookingDetail.js
const mongoose = require('mongoose');

const bookingDetailSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BookingDetail', bookingDetailSchema);