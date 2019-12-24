import React, { Component } from 'react';
import './App.css';
import ProductListing from './Pages/ProductListing';


class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductListing></ProductListing>
      </div>
    );
  }
}

export default App;
