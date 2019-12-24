import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from './App';
import NewCategory from './components/NewCategory';
import NewBrand from './components/NewBrand';
import NewProduct from './components/NewProduct';
import './index.css';

ReactDOM.render(
  <Router history={history}>
    <Route path="/brand/new" exact component={NewBrand} />
    <Route path="/category/new" exact component={NewCategory} />
    <Route path="/product/new" exact component={NewProduct} />
    <Route path="/" exact component={App} />
  </Router>,
  document.getElementById('root')
);
