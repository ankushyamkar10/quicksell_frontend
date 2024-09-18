// src/index.js or src/App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './feature/appContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
