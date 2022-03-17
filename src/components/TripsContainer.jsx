import React from 'react';
import ReactDOM from 'react-dom';
import CreateTrip from './CreateTrip.jsx'

const TripsContainer = (props) => {
  return (
    <div className="trips-container">
      <CreateTrip createTripSubmit = {props.createTripSubmit} users = {props.users} mountains = {props.mountains}/>
      {/* <Trips /> */}
    </div>
  )
} 
export default TripsContainer;