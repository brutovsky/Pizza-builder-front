import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import store from './app/Store'
import { Provider } from 'react-redux'

import {BrowserRouter, Router} from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
