const mongoose = require("mongoose");

const Booking = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    roomID: { type: String, required: true },
    name: { type: String, required: true },
    adults: { type: String, required: true },
    children: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    roomType: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { collection: "booking-data" }
);

const model = mongoose.model("BookingData", Booking);

module.exports = model;
