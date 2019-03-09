import React, { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import GroceryList from './components/GroceryList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <GroceryList />
      </div>
    );
  }
}

export default App;
