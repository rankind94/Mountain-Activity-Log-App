const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const mountainsLogController = require('./server/controllers/mountainsLogController');
const cors = require('cors');

app.use(cors());

//parser
app.use(bodyParser.json());

//request handler

//get reuquest to get list of mountains
app.get('/api/', mountainsLogController.getMountains, mountainsLogController.getUsers, (req, res) => {
  res.header('Access-Control-Allow-Origin', '*').json(res.locals.starterInfo);
})

// path to create a new user
app.post('/api/createUser', mountainsLogController.getCountryId, mountainsLogController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser)
})

// post request to create a new trip
app.post('/api/createTrip', 
  mountainsLogController.getTripUsers, 
  mountainsLogController.getMountainId,
  mountainsLogController.createTrip, 
  mountainsLogController.addTripsUsers, 
  (req, res) => {
  res.status(200).json(res.locals.newTrip)
})

//get request for specific user
app.get('/api/getTrips/:users_id', mountainsLogController.getUserTrips, (req, res) => {
  res.status(200).json(res.locals.tripData);
})
// path to add countries to db, will be comment out, done now just to create countries list in dbh
// app.post('/addcountries', mountainsLogController.addCountries, (req, res) => {
//   res.sendStatus(200);
// })

//unknown router error handler
app.use((req, res, next) => {
  res.status(404).json('Sorry, this route does not exist');
})

//global error handler
app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(500).json(err.message)
})
//start server
app.listen(3000, function() {
  console.log('Listening on port 3000');
})