const db = require('../models/mountainsLogModels');
const countries = require('../../db/countrieslist');


const mountainsLogController = {}

mountainsLogController.getMountains = (req, res, next) => {
  const query = `
    SELECT * FROM mountains
    `
  db.query(query)
    .then((data) => {
      res.locals.starterInfo = [ { mountains:data.rows } ]
    }
   )
    .then(() => next())
    .catch((err) => {
      err.message = 'issue in get mountains middleware'
      next(err);
    });
}

mountainsLogController.getUsers = (req, res, next) => {
  const query = `
    SELECT * FROM users
    `
  db.query(query)
    .then((data) => res.locals.starterInfo.push({users: data.rows}))
    .then(() => next())
    .catch((err) => {
      err.message = 'issue in get getUsers middleware'
      next(err);
    });
}
mountainsLogController.getCountryId = (req, res, next) => {
  const { country } = req.query;
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
     console.log(err);
      err.message = 'Issue in createUser controller';
      next(err)
    });
}

mountainsLogController.getTripUsers = (req, res, next) => {
  // get users from request query
  const { users_ids } = req.body;
  const values = users_ids;
  // loop over users array to help add to db query
  let query = `
    SELECT _id, FirstName, LastName
    FROM users
    WHERE 
    `;
  users_ids.forEach((el, index) => {
    index = index + 1;
    (index === users_ids.length) ? query = query.concat(` _id = ($${index});`):
    query = query.concat(` _id = ($${index}) OR`);
  })
  // make db query
  db.query(query, values)
  // save result from db query
    .then((data) => {
      res.locals.users_ids = [];
      data.rows.forEach((row) => {
        res.locals.users_ids.push(row._id);
      })
    })
  // next statment
    .then(() => next())
  //catch
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in getUsers controller';
      next(err)
    });
}

mountainsLogController.getMountainId = (req, res, next) => {
  // grab name from query
  const { mountname } = req.body;
  const values = [ mountname ];
  const query = `
    SELECT _id
    FROM mountains
    WHERE mountname = $1;
  `
  // use paramaterized queries to grab mountain Id from table
  db.query(query, values)
  // add mountain id to locals
    .then((data) => req.body.mountain_id = data.rows[0]._id)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in getMountainId controller';
      next(err)
    });
}

mountainsLogController.createTrip = (req, res, next) => {
  const { tripname, tripstart, tripsummit, tripend, mountain_id, notes } = req.body;
  const values = [ tripname, tripstart, tripsummit, tripend, mountain_id, notes ];
  const query = `
    INSERT INTO trips ( tripname, tripstart, tripsummit, tripend, mountain, notes )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `
  db.query(query, values) 
    .then((data) => res.locals.newTrip = data.rows[0])
    .then(() => next())
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in createTrip controller';
      next(err)
    });
}

mountainsLogController.addTripsUsers = (req, res, next) => {
  // create query to add a trips_users entry for each user in res.locals.trips_users_id for this trip
  const { users_ids } = res.locals;
  const trips_ids = res.locals.newTrip._id;

  let query = `
    INSERT INTO trips_users ( trips_id, users_id )
    VALUES
    `;
  const values = [];
   //creating query 
  let [p1, p2]  = [ 1, 2 ]
  users_ids.forEach((ele, index) => {
    values.push(trips_ids, ele);
    (index === users_ids.length - 1) ? query = query.concat(` ($${p1}, $${p2});`) :
    query = query.concat(` ($${p1}, $${p2}),`);
    [p1, p2] = [p1 + 2, p2 + 2];
  });
  
  db.query(query, values)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in addTripsUsers controller';
      next(err)
    });
}

mountainsLogController.getUserTrips = async (req, res, next) => {
  const { users_id } = req.params;
  let trips_ids;
  //get list of all trips logged for user in trips_users
  const tripsIdQuery = `
    SELECT trips_id
    FROM trips_users
    WHERE users_id = $1;
  `;
  const tripsIdValues = [ users_id ];

  await db.query(tripsIdQuery, tripsIdValues)
    .then((data) => {
      trips_ids = data.rows.reduce((acc, cur) => {
        acc.push(cur.trips_id);
        return acc;
      }, []);
    })
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in getUserTrips tripsIdQuery controller';
      next(err)
    });
    
  //grab trip for from trips table
  let tripsQuery = `
    SELECT trips.tripname, trips.tripstart, trips.tripsummit, trips.tripend, mountains.mountname, mountains.heightmeter, trips.notes,
    users.firstName, users.lastname
    FROM trips
    INNER JOIN mountains ON trips.mountain = mountains._id
    WHERE
  `

  trips_ids.forEach((el, index) => {
    index++;
    (index === trips_ids.length) ? tripsQuery = tripsQuery.concat(` trips._id = ($${index});`) :
    tripsQuery = tripsQuery.concat(` trips._id = ($${index}) OR`);
  })

  db.query(tripsQuery, trips_ids)
    .then((data) => {
      res.locals.tripData = data.rows;
      next()
    })
    .catch((err) => {
      console.log(err);
      err.message = 'Issue in getUserTrips tripsIdQuery controller';
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

