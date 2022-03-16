const express= require('express');
const app = express();
const bodyParser = require('body-parser');
const mountainsLogController = require('./server/controllers/mountainsLogController');


//parser
app.use(bodyParser.json());

//request handler

//get reuquest to get list of mountains
app.get('/', mountainsLogController.getMountains, (req, res) => {
  res.json(res.locals.mountains)
})

// path to create a new user
app.post('/createuser', mountainsLogController.getCountryId, mountainsLogController.createUser, (req, res) => {
  res.status(200).json(res.locals.newUser)
})

// post request to get all new logs


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