const db = require('../models/mountainsLogModels');
const countries = require('../../db/countrieslist');

const mountainsLogController = {}

mountainsLogController.getMountains = (req, res, next) => {
  const query = `
    SELECT * FROM mountains
    `
  db.query(query)
    .then((data) => res.locals.mountains = data.rows)
    .then(() => next())
    .catch((err) => {
      err.message = 'issue in get mountains middleware'
      next(err);
    });
}

mountainsLogController.getCountryId = (req, res, next) => {
  const { country } = req.query
  console.log(req.query)
  const countryQuery =`
    SELECT _id 
    FROM countries
    WHERE country = $1
  `;
  const values = [country];

  db.query(countryQuery, values) 
    .then((data) => req.query.countryId = data.rows[0]._id)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in getCountryId controller';
      next(err)
    });
}

mountainsLogController.createUser = (req, res, next) => {
  // add user to user table
  // set up query
  // get firstName, lastName, email, country integer from params or query
  const { firstname, lastname, email, countryId} = req.query
  console.log(req.query)
  const query = `
    INSERT INTO users (firstname, lastname, email, country)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [firstname, lastname, email, countryId];
  // add to data base
  db.query(query, values) 
  // add response to locals
    .then((data) => res.locals.newUser = data.rows[0])
  // call next
    .then(() => next())
   //catch for errors
   .catch((err) => {
     console.log(err)
    err.message = 'Issue in createUser controller'
    next(err)
  });
}

// mountainsLogController.addCountries = (req, res, next) => {
//   let query = 'INSERT INTO countries (country) VALUES'
//   countries.forEach((ele, index) => {
//     index = index + 1;
//     (index === countries.length) ? query = query.concat(` ($${index});`) :
//     query = query.concat(` ($${index}),`);
//   })
//   db.query(query, countries)
//     .then((data) => console.log('done'))  
//     .catch((err) => {
//       console.log(err)
//       err.message = 'Issue in add countries controller'
//       next(err)
//     });
// }

module.exports = mountainsLogController

