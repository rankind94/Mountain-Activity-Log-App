import { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import TripsContainer from './components/TripsContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountains: [],
      users: []
    }
    this.createTripSubmit = this.createTripSubmit.bind(this);
  }



  componentDidMount() {
    fetch('/api')
      .then(response => response.json())
      .then(json => {
        console.log('json',json)
        const newStateObj = {};
        newStateObj['mountains'] = json[0].mountains;
        newStateObj['users'] = json[1].users;
        console.log(newStateObj)
        this.setState({mountains: newStateObj.mountains, users: newStateObj.users})
      });
  }

  createTripSubmit(e) {
    e.preventDefault();
    const body = {
      tripname: e.target[0].value,
      tripstart: e.target[1].value,
      tripsummit: e.target[2].value,
      tripend: e.target[3].value,
      mountname: e.target[4].value,
      notes: e.target[5].value,
      users_ids: [Number(e.target[6].value)],
    }
    fetch('/api/createTrip', {
      'body': JSON.stringify(body),
      'method': 'POST',
      headers: {
        'Content-type': 'application/json'
      }     
    })
    
    
  }

  render () {
    console.log(this.state)
    return (
      <div className='App'>
        <div><Header /></div>
        <div><TripsContainer 
        createTripSubmit = {this.createTripSubmit} 
        users = {this.state.users}
        mountains = {this.state.mountains}
         />
         </div>
      </div>
    )
  }
}
export default App;