import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from "./Map/Map";
import GoogleMapsContainer from "./Maps/Maps"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMap/>
        //<GoogleMapsContainer/>
      </div>
    );
  }
}

export default App;
