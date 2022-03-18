import React from 'react';
import ReactDOM from 'react-dom';
import CreateTrip from './CreateTrip.jsx';
import '../App.css';

const TripsContainer = (props) => {
  return (
    <div className="trips-container">
      <h2>Create a Trip</h2>
      <CreateTrip createTripSubmit = {props.createTripSubmit} users = {props.users} mountains = {props.mountains}/>
      <h2>Display User Trips</h2>
      {/* <Trips /> */}
    </div>
  )
} 
export default TripsContainer;