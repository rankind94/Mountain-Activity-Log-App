import React from 'react';
import ReactDOM from 'react-dom';

const Trips = (props) => {
  // create all divs for existing user trips
  const userTrips = [];
  console.log(props.curTrips)
  props.curTrips.forEach((trip) => {
    userTrips.push(
      <div>
        <div>
          Trip Name: {`${trip.tripname}`}
        </div>
        <div>
          Start Date: {`${trip.tripstart}`}
        </div>
        <div>
          Summit Date {`${trip.tripsummit}`}
        </div>
        <div>
          End Date {`${trip.tripend}`}
        </div>
        <div>
          Mountain: {`${trip.mountname}`}
        </div>
        <div>
          Height (m): {`${trip.heightmeter}`}
        </div>
        <div>
          Notes: {`${trip.notes}`}
        </div>
      </div>
    );
    console.log(userTrips);
  })
  return (
    <div className = "user-trips-container">
      {userTrips}
    </div>
  );
}
export default Trips;