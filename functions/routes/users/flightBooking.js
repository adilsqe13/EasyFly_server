const express = require('express');
const router = express.Router();
const Flights = require('../../models.js/admin/Flight');
const BookedFlights = require('../../models.js/BookedFlight');
const fetchuser = require('../../middleware/fetchuser');



router.post('/booking', fetchuser, async (req, res) => {
  try {
    const { flightId, person, date } = req.body
    const flight = await Flights.find({ _id: flightId });
    // Ticket will book only when seat will available
    if(flight[0].seating_capacity >= Number(person)){
      const bookedFlight = new BookedFlights({ userId: req.user.id, flightId, flight, person, date });
      const savedBooking = await bookedFlight.save();
      await Flights.updateOne({_id: flightId},{$inc: {seating_capacity: -person}});
      res.json({ success: true, savedBooking });
    }else{
      res.json({ success: false});
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/get-bookings", fetchuser, async (req, res) => {
  try {
    const allBookings = await BookedFlights.find({ userId: req.user.id });
    res.json(allBookings);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


router.delete('/cancel-booking', fetchuser, async (req, res) => {
  try {
    const { bookingId } = req.body;
    await BookedFlights.deleteOne({ _id: bookingId });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;