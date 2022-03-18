import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

const CreateTrip = (props) => {
  const usersOptions = [];
  props.users.forEach((user) => {
    usersOptions.push(<option key = {user._id} value = {user._id} label={`${user.firstname} ${user.lastname}`}></option>)
  })

  const mountainsOptions = [];
  props.mountains.forEach((mount) => {
    mountainsOptions.push(<option key = {mount.id} value = {mount.mountname} label = {mount.mountname}></option>)
  })

  return (
    <div className='create-trip'>
      <form id='create-trip-form' onSubmit= {props.createTripSubmit}>
        <label>
          *Trip Name:
          <input type="text" name="tripname" />
        </label>
        <label>
          *Start Date:
          <input type="date" name="tripstart" />
        </label>
        <label>
          Summit Date:
          <input type="date" name="tripsummit" />
        </label>
        <label>
          *End Date:
          <input type="date" name="tripend" />
        </label>
        <label>
          *Mountain: 
          <select multiple = "" name='mountains[]'>
            { mountainsOptions }
          </select>
        </label>
        <label>
          Notes:
          <textarea rows="5" cols="60" type="text" name="notes" />
        </label>
        <label>
          Users:
          <select multiple = "" name='users[]'>
            { usersOptions }
          </select>
        </label>
          
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default CreateTrip;