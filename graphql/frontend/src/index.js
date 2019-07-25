import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import ReactDOM from 'react-dom';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './containers/App';
import Reducer from './store/reducer/reducer'

axios.defaults.baseURL = 'http://localhost:3001/graphql'

let logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching...', action)
      const result = next(action)
      console.log('[Middleware] State...', store.getState())
      return result
    }
  }
}

const dev = process.env.NODE_ENV === 'development'
const composeEnhancers = dev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose
const store = dev ? createStore(Reducer, composeEnhancers(applyMiddleware(logger, thunk)))
  : createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
