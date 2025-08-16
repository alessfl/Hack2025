export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Mi App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Acerca</a>
            </li>
          </ul>
          {/* Switch Modo Oscuro */}
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
        </div>
      </div>
    </nav>
  );
}
