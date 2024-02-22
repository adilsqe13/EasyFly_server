const express = require('express');
const router = express.Router();
const Flights = require('../models.js/admin/Flight');


router.get("/get-all-flights", async (req, res) => {
  try {
    const allFlights = await Flights.find();
    res.json(allFlights);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

router.post("/get-searched-flights", async (req, res) => {
  try {
    const {from , to} = req.body;
    const allFlights = await Flights.find({from, to});
    res.json(allFlights);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;