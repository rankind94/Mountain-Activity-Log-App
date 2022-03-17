import React from 'react';
import ReactDOM from 'react-dom';

const CreateTrip = (props) => {
  const usersOptions = [];
  props.users.forEach((user) => {
    usersOptions.push(<option value = {user.firstname}>{`${user.firstname} ${user.lastname}`}</option>)
  })

  const mountainsOptions = [];
  props.mountains.forEach((mount) => {
    mountainsOptions.push(<option value = {mount.mountname}>{`${mount.mountname}`}</option>)
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
          <input type="text" name="notes" />
        </label>
        Users:
        <select multiple = "" name='users[]'>
          { usersOptions }
        </select>
          
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
export default CreateTrip;