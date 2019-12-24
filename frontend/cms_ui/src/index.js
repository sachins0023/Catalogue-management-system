import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from './history';
import App from './App';
import NewCategory from './components/NewCategory';
import NewBrand from './components/NewBrand';
import NewProduct from './components/NewProduct';
import SelectedProduct from './components/SelectedProduct';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/brand/new" exact component={NewBrand} />
      <Route path="/category/new" exact component={NewCategory} />
      <Route path="/product/new" exact component={NewProduct} />
      <Route path="/product/:id" exact component={SelectedProduct} />
      <Route path="/" exact component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
