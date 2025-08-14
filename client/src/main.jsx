import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // 1. Make sure this import exists

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. This <BrowserRouter> MUST wrap your <App /> component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);