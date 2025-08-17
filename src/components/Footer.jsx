import React from 'react';
import Swatch from './Swatch.jsx'; // Asegúrate de importar Swatch

export default function Footer({ darkMode }) {
  const footerClasses = darkMode ? "bg-dark text-light border-light-50" : "bg-white bg-opacity-80 border-black-50";

  return (
    <footer className={`border-top ${footerClasses}`}>
      <div className="container-fluid container-md px-4 py-4 row g-4 align-items-center">
        <p className={`col-12 fs-6 mb-0 text-center ${darkMode ? "text-light-80" : "text-dark-80"}`}>
          © {new Date().getFullYear()} HyPHATia. Construyendo caminos de aprendizaje inclusivos.
        </p>
      </div>
    </footer>
  );
}