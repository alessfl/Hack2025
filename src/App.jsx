// En App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import Rewards from "./components/Rewards.jsx";
import Footer from "./components/Footer.jsx";
import LoginPage from "./components/LoginPage.jsx";
import DashboardAlumno from "./components/DashboardAlumno.jsx";
import TestVocacional from '/Users/alessfl/Downloads/Hack2025/Hack2025/src/components/testVocacional.jsx'; // 👈 Importa el componente del test

// Importamos los componentes de Framer Motion para manejar las animaciones de las transiciones de página.
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null); // 👈 Agrega un estado para guardar los datos del usuario

  // Función para manejar el inicio de sesión exitoso
  const handleSuccessfulLogin = (userData) => {
    setUser(userData); // Guarda los datos del usuario
    setCurrentPage('dashboard'); // Cambia la página al dashboard
  };

  // Función para cerrar la sesión
  const handleLogout = () => {
    setUser(null); // Limpia los datos del usuario
    setCurrentPage('home'); // Regresa a la página de inicio
  };

  // Función para manejar el envío del test y guardarlo en la base de datos
  const handleTestSubmit = async (answers) => {
    // Aquí puedes incluir la lógica para enviar el JSON a tu backend
    console.log("Answers from Test:", answers);
    // Ejemplo de cómo harías el fetch, usando una URL de prueba
    try {
      // Reemplaza 'https://tu-endpoint-para-el-test.com' con la URL real de tu API
      const response = await fetch('https://d9deb98f6310.ngrok-free.app/save-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Test guardado exitosamente:", result);
        // Puedes redirigir al usuario al dashboard o mostrar un mensaje de éxito
        setCurrentPage('dashboard');
        // También podrías actualizar el estado del usuario si es necesario
      } else {
        console.error("Error al guardar el test:", result.message);
        // Maneja el error, por ejemplo, mostrando una notificación al usuario
      }
    } catch (error) {
      console.error("Error de conexión al guardar el test:", error);
    }
  };

  const themeClasses = darkMode ? "bg-dark text-light" : "bg-light text-dark";

  const renderPage = () => {
    const pageVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };

    switch(currentPage) {
      case 'home':
        return (
          <motion.div
            key="home-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Hero darkMode={darkMode} />
            <Features darkMode={darkMode} />
            <Rewards darkMode={darkMode} />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div
            key="login-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <LoginPage 
                darkMode={darkMode} 
                onBack={() => setCurrentPage('home')} 
                onSuccessfulLogin={handleSuccessfulLogin} 
            />
          </motion.div>
        );
      case 'dashboard':
        return (
          <motion.div
            key="dashboard-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <DashboardAlumno 
                user={user}
                onLogout={handleLogout}
                onStartTest={() => setCurrentPage('testVocacional')} // 👈 Agrega un nuevo prop para iniciar el test
            />
          </motion.div>
        );
      case 'testVocacional': // 👈 Nuevo caso para la página del test
        return (
          <motion.div
            key="test-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <TestVocacional
              onSubmit={handleTestSubmit}
              onCancel={() => setCurrentPage('dashboard')}
              darkMode={darkMode}
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="default-page"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Hero darkMode={darkMode} />
            <Features darkMode={darkMode} />
            <Rewards darkMode={darkMode} />
          </motion.div>
        );
    }
  };

  return (
    <>
      <div className={`min-vh-100 vw-100 ${highContrast ? "contrast-125" : ""} ${themeClasses}`}>
        <Navbar 
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onLoginClick={() => setCurrentPage('login')}
          isDashboard={currentPage === 'dashboard'}
          onLogout={() => {
            setUser(null);
            setCurrentPage('home');
          }}
        />
        
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
