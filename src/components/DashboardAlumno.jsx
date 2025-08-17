import React, { useState } from 'react';
import './DashboardAlumno.css'; // Importamos el archivo CSS para los estilos y la animación
import logo from '/Users/alessfl/Downloads/Hack2025/Hack2025/src/assets/azulfondotransparente.png'; // Importa el logo
import TestVocacional from '/Users/alessfl/Downloads/Hack2025/Hack2025/src/components/testVocacional'; // Importamos el nuevo componente del test

export default function DashboardAlumno({ user, onStartTest }) { // Eliminado 'onLogout' ya que el botón de cerrar sesión está en el Navbar
  const [testVisible, setTestVisible] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleStartTest = () => {
    setTestVisible(true);
  };

  const handleSubmitTest = (resultados) => {
    // ⚠️ Lógica para enviar los resultados al backend
    console.log("Enviando los resultados del test vocacional para ser evaluados.");
    console.log(resultados);
    
    // Aquí iría tu fetch/axios para enviar los datos
    // ...

    // Simulamos que el test se completó con éxito
    setTestVisible(false);
    setTestCompleted(true);
    // ⚠️ NO USAR alert() en producción, usar un modal o mensaje en la UI
    // Por ahora lo dejaremos como un placeholder, pero es mejor usar una UI custom.
    alert("¡Test completado! Tus respuestas serán evaluadas pronto.");
  };

  const handleCancelTest = () => {
    setTestVisible(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img 
          src={logo}
          alt="Logo de Hypathia" 
          className="logo-hypathia" 
        />
        {/* Eliminado el botón de "Cerrar Sesión" ya que ahora se maneja en el Navbar */}
      </div>
      <div className="dashboard-content">
        <h2>Bienvenido, {user ? user.nombre : "Alumno"}</h2>
        <p>Prepárate para descubrir tu camino profesional.</p>
        
        {!testCompleted ? (
          <div className="test-section">
            {!testVisible ? (
              <button 
                onClick={handleStartTest} 
                className="btn-animated btn btn-primary btn-lg"
              >
                Iniciar Test Vocacional
              </button>
            ) : (
              // 👈 Renderiza el componente del test
              <TestVocacional
                onSubmit={handleSubmitTest}
                onCancel={handleCancelTest}
              />
            )}
          </div>
        ) : (
          <div className="test-completed-message">
            <h3>¡Test Completado!</h3>
            <p>Gracias por completar el test. Recibirás tus resultados por email en los próximos días.</p>
          </div>
        )}
      </div>
    </div>
  );
}