import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMedal, FaCloudDownloadAlt, FaBus } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';

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

export default function RutasAprendizaje({ darkMode }) {
  // Define las rutas de aprendizaje. Puedes modificar estos datos.
  const rutas = [
    { title: 'Orientación Vocacional', description: 'Descubre tus intereses y aptitudes.', icon: FaGraduationCap },
    { title: 'Habilidades del Futuro', description: 'Aprende sobre tecnologías emergentes.', icon: BsStars },
    { title: 'Preparación Universitaria', description: 'Prepárate para los exámenes de admisión.', icon: FaGraduationCap },
    { title: 'Liderazgo y Emprendimiento', description: 'Desarrolla habilidades clave para el éxito.', icon: FaMedal },
  ];

  const aptitudes = ['Creatividad', 'Liderazgo', 'Pensamiento Lógico', 'Comunicación'];

  return (
    <div 
      className={`min-h-screen py-12 px-4 transition-colors duration-300 relative overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}
      style={{
        // Aquí puedes colocar la URL de la imagen de fondo
        backgroundImage: 'url("https://placehold.co/1920x1080/FFFFFF/2c3e50?text=Background+Image")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-2xl backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Título de la sección */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-center mb-10"
            variants={itemVariants}
          >
            Tus Rutas de Aprendizaje
          </motion.h1>

          {/* Sección de Rutas de Aprendizaje */}
          <motion.div className="mb-12" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Rutas de Aprendizaje</h2>
            <div className="flex flex-col md:flex-row items-center justify-center relative space-y-6 md:space-y-0 md:space-x-6">
              {rutas.map((ruta, index) => (
                <React.Fragment key={index}>
                  <div
                    className="relative flex flex-col items-center p-6 rounded-2xl shadow-lg w-full md:w-1/4 min-h-[200px] text-center"
                    style={{ backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}
                  >
                    <div className="text-4xl mb-4 text-blue-500">
                      <ruta.icon />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{ruta.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{ruta.description}</p>
                  </div>
                  {index < rutas.length - 1 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-6 md:h-6 rotate-90 md:rotate-0">
                      <svg className="text-blue-500 w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Secciones de Aptitudes y Mascotas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Aptitudes que te Definen</h2>
              <ul className="list-disc list-inside space-y-2">
                {aptitudes.map((aptitud, index) => (
                  <li key={index} className="text-lg">{aptitud}</li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Mascota</h2>
              <div className="flex items-center justify-center p-4 rounded-xl shadow-inner border border-gray-300 dark:border-gray-700">
                <span className="text-5xl mr-4" role="img" aria-label="Mascota Nahualli">🦊</span>
                <div>
                  <h3 className="text-xl font-semibold">Náhualli</h3>
                  <p className="text-2xl font-bold text-blue-500">0 Puntos</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sección de Recompensas y Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-lg text-center" variants={itemVariants}>
              <div className="text-5xl text-blue-500 mb-4"><FaCloudDownloadAlt /></div>
              <h3 className="text-xl font-bold mb-2">Modo Offline</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accede a tus módulos sin conexión a internet.</p>
            </motion.div>
            
            <motion.div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-lg text-center" variants={itemVariants}>
              <div className="text-5xl text-blue-500 mb-4"><FaMedal /></div>
              <h3 className="text-xl font-bold mb-2">Certificados y Medallas</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gana recompensas al completar tus rutas.</p>
            </motion.div>
            
            <motion.div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-3xl shadow-lg text-center" variants={itemVariants}>
              <div className="text-5xl text-blue-500 mb-4"><FaBus /></div>
              <h3 className="text-xl font-bold mb-2">Servicios de Transporte</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Servicios de transporte universitario de próxima apertura.</p>
            </motion.div>
          </div>

          <motion.div className="text-center mt-12" variants={itemVariants}>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              ¡Este es solo el comienzo de tu viaje de aprendizaje!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}