const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

const roomNames = new Map([
  [1, { name: "Standard" }],
  [2, { name: "Deluxe" }],
  [3, { name: "Executive" }],
  [4, { name: "Business_Suite" }],
  [5, { name: "Deluxe_Suite" }],
]);

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find({});

    res.json({ status: "ok", rooms: rooms });
  } catch (error) {
    console.error("Room error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await Room.create({
      number: req.body.roomNumber,
      type: req.body.roomType,
      price: req.body.roomPrice,
      available: true,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Room Adding error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.delete("/", async (req, res) => {
  try {
    await Room.findByIdAndDelete({ _id: req.body.id });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Room Delete error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.post("/edit_room", async (req, res) => {
  try {
    await Room.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          number: req.body.number,
          type: req.body.type,
          price: req.body.price,
          available: req.body.available,
        },
      },
      { new: true }
    );

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Room Edit error:", error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.post("/booked", async (req, res) => {
  try {
    await Room.findOneAndUpdate(
      { number: req.body.data.roomID },
      { $set: { available: false } },
      { new: true }
    );

    const roomName = roomNames.get(req.body.data.roomType);

    const booked = await Booking.create({
      userID: req.body.data.userID,
      roomID: req.body.data.roomID,
      name: req.body.data.name,
      adults: req.body.data.numberOfAdults,
      children: req.body.data.numberOfChildren,
      checkInDate: req.body.data.checkIn,
      checkOutDate: req.body.data.checkOut,
      roomType: roomName.name,
      quantity: req.body.data.quantity,
      price: req.body.data.price,
    });

    res.json({ status: "ok", booked: booked });
  } catch (error) {
    console.error("Room Booked error:", error);
    console.log(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.get("/get_bookings", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;
    const bookings = await Booking.find({
      userID: id,
    });

    res.json({ status: "ok", bookings: bookings });
  } catch (error) {
    console.error("Room Bookings error:", error);
    console.log(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

router.delete("/delete_booking", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret123");
    const id = decode.id;

    await Room.findOneAndUpdate(
      { number: req.body.roomID },
      { $set: { available: true } },
      { new: true }
    );

    await Booking.findOneAndDelete({
      userID: id,
      roomID: req.body.roomID,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Room Bookings Delete error:", error);
    console.log(error);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
});

module.exports = router;
