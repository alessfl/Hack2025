import React from 'react';
import FeatureCard from './FeatureCard.jsx'; // Importación corregida (sin llaves)

export default function Features({ darkMode }) {
  return (
    <section className="container-fluid container-md px-4 py-4 py-md-5">
      <div className="row g-4 g-md-5">
        <div className="col-12 col-md-6 col-lg-3">
          <FeatureCard darkMode={darkMode} icon={<i className="fa-solid fa-check-circle"></i>} title="Diseño accesible" desc="Contraste alto, tipografía legible, focos visibles y soporte de lector de pantalla." />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <FeatureCard darkMode={darkMode} icon={<i className="fa-solid fa-file-arrow-down"></i>} title="Modo offline" desc="Descarga PDFs de lecciones; sincroniza tu avance cuando vuelvas a tener conexión." />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <FeatureCard darkMode={darkMode} icon={<i className="fa-solid fa-users"></i>} title="Mentores universitarios" desc="Practicantes guían y validan tu progreso con feedback humano." />
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <FeatureCard darkMode={darkMode} icon={<i className="fa-solid fa-bus"></i>} title="Recompensas con impacto" desc="Visión: alianzas para descuentos en transporte y becas." />
        </div>
      </div>
    </section>
  );
}
