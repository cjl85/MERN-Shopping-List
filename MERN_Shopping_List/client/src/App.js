import React, { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import GroceryList from './components/GroceryList';
import ItemModal from './components/ItemModal';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <ItemModal />
        <GroceryList />
      </div>
      </Provider>
    );
  }
}

export default App;
