import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/Store';
import { ToastContainer } from 'react-toastify';
import { options } from './constants/utils.js';


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ToastContainer {...options} />
        <App />
      </Provider>
    </PersistGate>
  ,
)
