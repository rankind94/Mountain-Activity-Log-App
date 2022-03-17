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