import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardAlumno from './components/DashboardAlumno';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleSuccessfulLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    // Aquí puedes guardar un token del servidor para mantener la sesión
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    // Aquí puedes eliminar el token de la sesión
  };

  // Renderizado condicional basado en el estado
  if (isAuthenticated && userRole === 'alumno') {
    return <DashboardAlumno onLogout={handleLogout} />;
  } else {
    // Pasar la función de login exitoso como prop al LoginPage
    return <LoginPage onSuccessfulLogin={handleSuccessfulLogin} />;
  }
}

export default App;