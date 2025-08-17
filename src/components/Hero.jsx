import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero({ darkMode }) {
  return (
    <header className="position-relative">
      <div className="container-fluid container-md px-4 py-5 py-md-5">
        <div className="row g-5 align-items-center">
          <motion.div
            className="col-12 col-md-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className={`display-4 fw-black tracking-tight ${darkMode ? "text-light" : "text-primary"}`}
              variants={itemVariants}
            >
              Desde nuestras raíces hasta el futuro: educación accesible para todas y todos
            </motion.h1>
            <motion.p
              className={`mt-3 fs-5 ${darkMode ? "text-light-80" : "text-dark-80"}`}
              variants={itemVariants}
            >
            
              Porque el conocimiento no tiene fronteras, y cada paso que damos juntos honra nuestra diversidad, abre caminos de inclusión y construye un mañana donde nadie se quede atrás.
            </motion.p>
            <motion.div
              className="mt-4 d-flex flex-wrap align-items-center gap-3"
              variants={itemVariants}
            >
              <a
                id="comenzar"
                href="#test"
                className="btn btn-secondary rounded-5 py-3 px-4 fw-semibold text-white text-decoration-none"
                aria-label="Comenzar test vocacional"
              >
                Iniciar Test Vocacional
              </a>
              <a
                href="#rutas"
                className={`btn btn-outline-primary rounded-5 py-3 px-4 fw-semibold text-decoration-none ${darkMode ? "bg-dark text-light" : "bg-white"}`}
              >
                Explorar Rutas
              </a>
              <div className={`d-flex align-items-center gap-2 fs-6 ${darkMode ? "text-light-80" : "text-dark-80"}`} role="status" aria-live="polite">
                <i className="fa-solid fa-shield-halved"></i>
                Tests vocacionales y psicométricos, rutas de aprendizaje gamificadas y mentoría de universitarios.
              </div>
            </motion.div>
          </motion.div>

          <div className="col-12 col-md-6">
            <div className={`rounded-5 shadow-xl p-4 border ${darkMode ? "bg-dark text-light border-light-50" : "bg-white border-black-50"}`}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center h-12 w-12 rounded-4 bg-accent" aria-hidden>
                      <i className="fa-solid fa-sparkles fs-4 text-primary"></i>
                    </div>
                    <div>
                      <p className={`fs-6 mb-0 ${darkMode ? "text-light-80" : "text-dark-80"}`}>Mascota</p>
                      <p className={`fw-bold mb-0 ${darkMode ? "text-light" : ""}`}>Náhualli – Nivel 3</p>
                    </div>
                  </div>
                  <div className={`fs-6 d-flex align-items-center gap-2 ${darkMode ? "text-light" : ""}`}>
                    <i className="fa-solid fa-trophy text-secondary"></i>
                    1,250 destellos de Náhualli
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`d-flex justify-content-between fs-6 ${darkMode ? "text-light-80" : "text-dark-80"}`}>
                    <span>Progreso de ruta: Orientación</span>
                    <span>60%</span>
                  </div>
                  <div className="progress mt-2 rounded-pill h-3" aria-hidden>
                    <div className="progress-bar bg-secondary rounded-pill" role="progressbar" style={{ width: "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
                <div className="mt-4 row g-3">
                  <div className="col-6">
                    <button className="w-100 btn btn-primary rounded-4">
                      Comienza un nuevo módulo
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="w-100 btn btn-outline-primary rounded-4">
                      Ver recompensas
                    </button>
                  </div>
                </div>
                <p className="visually-hidden">La tarjeta muestra una mascota, puntos de experiencia y una barra de progreso con buen contraste.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
    );
}
