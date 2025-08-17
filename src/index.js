// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa tu componente principal App.js
import './index.css'; // Opcional: si tienes estilos CSS globales

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);