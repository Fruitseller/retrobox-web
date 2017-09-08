import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={AddRetroItem} />
          <Route path="/list" component={ListRetroItems} />
        </div>
      </Router>
    );
  }
}

export default App;
