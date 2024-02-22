require('dotenv').config();
const express = require('express');
const router = express.Router();
const Flight = require('../../models.js/admin/Flight');
const BookedFlights = require('../../models.js/BookedFlight');
const fetchadmin = require('../../middleware/fetchadmin');


router.post('/add-flight', fetchadmin, async (req, res) => {
  try {
    let { companyName, flightNumber, from, to, time, seating_capacity, price } = req.body
    let From = from.toUpperCase();
    let To = to.toUpperCase();
    const flight = new Flight({
     companyName, flightNumber, seating_capacity, price, From, To, time
    })
    const saveFlight = await flight.save()
    res.json({ success: true, saveFlight });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get("/get-orders", fetchadmin, async (req, res) => {
  try {
    const allOrders = await BookedFlights.find({});
    res.json(allOrders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


router.get("/get-my-flights", fetchadmin, async (req, res) => {
  try {
    const myFlights = await Flight.find({});
    res.json(myFlights);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});



router.delete("/delete-flight", fetchadmin, async (req, res) => {
  try {
    const { flightId } = req.body;
    await Flight.deleteOne({ _id: flightId });
    await BookedFlights.deleteOne({ flightId: flightId });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;