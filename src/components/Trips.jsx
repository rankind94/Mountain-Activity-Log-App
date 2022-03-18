import React from 'react';
import ReactDOM from 'react-dom';

const Trips = (props) => {
  // create all divs for existing user trips
  const userTrips = [];
  props.tripData.forEach((trip) => {
    userTrips.push(
      <div>
        <label>
          Trip Name: {`${trip[0]}`}
        </label>
        <label>
          Start Date: {`${trip[1]}`}
        </label>
        <label>
          Summit Date {`${trip[2]}`}
        </label>
        <label>
          End Date {`${trip[3]}`}
        </label>
        <label>
          Mountain: {`${trip[4]}`}
        </label>
        <label>
          Height (m): {`${trip[5]}`}
        </label>
        <label>
          Notes: {`${trip[6]}`}
        </label>
      </div>
    )
  })
  return (
    <div className = "user-trips-container">
      { userTrips }
    </div>
  );
}
export default Trips;