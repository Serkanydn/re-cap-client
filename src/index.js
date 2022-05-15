import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { createStoreHook, Provider } from "react-redux";
import { configureStore } from './store/configureStore';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore()


root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

