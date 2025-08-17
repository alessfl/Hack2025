import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, desc, darkMode }) => (
  <motion.div
    className={`rounded-5 p-4 shadow-sm border border-black-50 focus-within:ring-2 focus-within:ring-primary ${darkMode ? "bg-dark text-light border-light-50" : "bg-white text-dark"}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.05 }} // Escala al pasar el mouse
    whileTap={{ scale: 0.95 }} // Simula un clic
  >
    <div className="d-flex align-items-center gap-2 text-primary fw-semibold">
      {icon}
      <h3 className="fs-6 mb-0">{title}</h3>
    </div>
    <p className={`mt-2 fs-6 ${darkMode ? "text-light-80" : "text-dark-80"}`}>{desc}</p>
  </motion.div>
);

export default FeatureCard;