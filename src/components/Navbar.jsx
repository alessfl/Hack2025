import React from 'react';
import logo from '../assets/blancafondotransparente.png';
import fondoNavbar from '../assets/azul.png';

export default function Navbar({
  highContrast,
  setHighContrast,
  darkMode,
  setDarkMode,
  onLoginClick,
  isDashboard,
  onLogout
}) {
  const navClasses = darkMode ? "bg-dark text-light border-light-50" : "bg-white bg-opacity-80 border-black-50";

  return (
    <nav
      className={`sticky-top z-100 border-bottom ${navClasses}`}
      style={{
        backgroundImage: `url(${fondoNavbar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-fluid container-md px-4 py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center justify-content-center h-9 w-9 rounded-4 bg-primary text-white">
            <i className="fa-solid fa-compass fs-5"></i>
          </div>
          <div className="d-flex flex-column align-items-left gap-2">
            <img src={logo} alt="Logo de HyPHATia" style={{ maxWidth: '125px' }}/>
            <span className={`d-block fs-6 ${darkMode ? "text-light-80" : "text-primary"}`}>Tu camino hacia el futuro</span>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {isDashboard ? (
            <button onClick={onLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <button
                onClick={() => setHighContrast((v) => !v)}
                className={`px-3 py-2 rounded-4 border focus-visible-ring-2 focus-visible-ring-primary ${darkMode ? "bg-dark text-light border-light-50 hover-bg-light-70" : "border-primary-50 bg-white hover-bg-light"}`}
                aria-pressed={highContrast}
                aria-label="Alternar alto contraste"
              >
                Accesibilidad
              </button>
              <a onClick={onLoginClick} className={`px-4 py-2 rounded-4 bg-primary text-white text-decoration-none hover-opacity-90`}>
                Iniciar sesión
              </a>
            </>
          )}
        </div>
        {!isDashboard && (
          <div className="form-check form-switch text-nowrap">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? "Modo Oscuro" : "Modo Claro"}
            </label>
          </div>
        )}
      </div>
    </nav>
  );
}