import React from 'react';
import RewardCard from './RewardCard.jsx'; // Importación corregida (sin llaves)

export default function Rewards({ darkMode }) {
  return (
    // Sección de recompensas
    <section className="container-fluid container-md px-4 pb-5 pb-md-5" aria-labelledby="recompensas">
      <h2 id="recompensas" className={`fs-2 fw-extrabold ${darkMode ? "text-light" : "text-primary"}`}>Recompensas</h2>
      <p className={`mt-2 ${darkMode ? "text-light-80" : "text-dark-80"} max-w-2xl`}>
        Gana destellos de tu mascota al completar módulos. Canjéalos por insignias y, en el futuro, beneficios reales con aliados públicos y privados.
      </p>
      <div className="mt-4 row g-4">
        <div className="col-12 col-md-4">
          <RewardCard darkMode={darkMode} title="Insignia: Explorador" points={300} description="Completa tu primer test vocacional y desbloquea la insignia Explorador." />
        </div>
        <div className="col-12 col-md-4">
          <RewardCard darkMode={darkMode} title="Certificado digital" points={1000} description="Termina una ruta y genera un certificado descargable para tu portafolio." />
        </div>
        <div className="col-12 col-md-4">
          <RewardCard darkMode={darkMode} title="Transporte público (vision)" points={2000} description="Canjea por descuento en transporte (requiere convenio)." locked />
        </div>
      </div>
    </section>
  );
}
