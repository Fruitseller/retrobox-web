import React, { Component } from 'react';
import AddRetroItem from './components/AddRetroItem';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddRetroItem/>
      </div>
    );
  }
}

export default App;
