import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from './Context';
import App from './App';

/**
  Renders the App component inside of context Provider 
 */
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));