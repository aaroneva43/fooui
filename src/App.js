import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider, connect } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'



import {
  Router,
  Route,
  Link
} from 'react-router-dom';

import Login from './Login'

const history = createHistory()
const middleware = [routerMiddleware(history)]

// support redux-dev-tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



// create store
const store = createStore(routerReducer, composeEnhancers(applyMiddleware(...middleware)))


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter basename="/somedir" history={history}>
          <Login />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App


