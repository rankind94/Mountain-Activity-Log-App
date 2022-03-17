import { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
// import TripsContainer from './components/TripsContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mountains: ''
    }
    // this.fetchRequest = this.fetchRequest.bind(this);
  }

  // fetchRequest = () => {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(json => this.setState({mountains: json}));
  // }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(json => this.setState({mountains: json}));
  }

  render () {
    console.log(this.state)
    return (
      <div className='App'>
        <div><Header /></div>
        {/* <div><TripsContainer /></div> */}
      </div>
    )
  }
}
export default App;