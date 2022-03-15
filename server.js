const express= require('express');
const app = express();
const bodyParser = require('body-parser');


//parser
app.use(bodyParser.json());

//request handler

//get 

//unknown router error handler
app.use((req, res, next)=> {
  res.status(404).json('Sorry, this route does not exist');
})

//global error handler
app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json('Global Erron Handler....Something Broke!')
})
//start server
app.listen(3000, function() {
  console.log('Listening on port 3000');
})