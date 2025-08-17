import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import fondoLogin from '../assets/estandar.png'; // Cambia por el nombre de tu imagen

export default function LoginPage({ onBack, darkMode, onSuccessfulLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState('');
  const [emailRegistro, setEmailRegistro] = useState('');
  const [contrasenaRegistro, setContrasenaRegistro] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [preferencia, setPreferencia] = useState(''); // Guarda el ID de la preferencia
  const [emailLogin, setEmailLogin] = useState('');
  const [contrasenaLogin, setContrasenaLogin] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMensajeError('');
  };

  const loginClasses = darkMode ? "bg-dark text-light" : "bg-light text-dark";
  const cardClasses = darkMode ? "bg-dark text-light border-light-50" : "bg-white border-black-50";

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!emailLogin || !contrasenaLogin) {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://f8e5079b400e.ngrok-free.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, contraseña: contrasenaLogin }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login exitoso:", data);
       
        
        if (data.usuario.token) {
          localStorage.setItem("token", data.usuario.token);
          console.log("Token guardado en localStorage:", data.usuario.token);
        }

        setMensajeError('');
        if (onSuccessfulLogin) onSuccessfulLogin(data);
      } else {
        setMensajeError(data.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      setMensajeError('Error de conexión.');
    }
    setLoading(false);
  };

  const handleRegistro = async (event) => {
    event.preventDefault();
    if (!nombre || !emailRegistro || !contrasenaRegistro || !confirmarContrasena || !rol || !preferencia) {
      setMensajeError('Por favor, completa todos los campos.');
      return;
    }
    if (contrasenaRegistro !== confirmarContrasena) {
      setMensajeError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    
    // Objeto de usuario con los nombres de campo y tipos de datos correctos
    const nuevoUsuario = {
      nombre,
      email: emailRegistro,
      // Se corrige el nombre de la propiedad a "contraseña"
      "contraseña": contrasenaRegistro,
      rol,
      // Se corrige el nombre de la propiedad y se convierte a entero
      id_preferencia: parseInt(preferencia, 10), 
    };

    try {
      const response = await fetch('https://f8e5079b400e.ngrok-free.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario),
      });
      const data = await response.json();
      if (response.ok) {
        // ⚠️ CAMBIO IMPORTANTE: Guardar el token en localStorage para el registro también
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setMensajeError('');
        if (onSuccessfulLogin) onSuccessfulLogin(data);
      } else {
        setMensajeError(data.message || 'Error al registrarse.');
      }
    } catch (error) {
      setMensajeError('Error de conexión.');
    }
    setLoading(false);
  };

  return (
    <div
      className={`min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center ${loginClasses}`}
      style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Filtro oscuro y desenfoque */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: darkMode
            ? 'rgba(30,30,30,0.6)'
            : 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 1,
        }}
      />
      <div
        className={`rounded-5 shadow-xl p-5 border ${cardClasses}`}
        style={{ position: 'relative', zIndex: 2, maxWidth: 480, width: '100%' }}
      >
        <h2 className={`display-5 fw-bold ${darkMode ? "text-light" : "text-primary"}`}>
          {isLogin ? "Iniciar sesión" : "Crear cuenta"}
        </h2>
        <p className={`mt-3 ${darkMode ? "text-light-80" : "text-dark-80"}`}>
          {isLogin ? "Bienvenido. Por favor, ingresa tus credenciales." : "Bienvenido. Completa tus datos para crear una nueva cuenta."}
        </p>

        {isLogin ? (
          <form className="mt-4" onSubmit={handleLogin} aria-label="Formulario de inicio de sesión">
            {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
            <div className="mb-3">
              <label htmlFor="emailLogin" className="form-label" aria-label="Correo electrónico">Correo electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="emailLogin"
                aria-required="true"
                aria-describedby="emailLoginHelp"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordLogin" className="form-label" aria-label="Contraseña">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="passwordLogin" 
                aria-required="true"
                value={contrasenaLogin}
                onChange={(e) => setContrasenaLogin(e.target.value)}
              />
            </div>
            <button type="submit" className="w-100 btn btn-primary mt-4" disabled={loading} aria-busy={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        ) : (
          <form className="mt-4" onSubmit={handleRegistro} aria-label="Formulario de registro">
            {mensajeError && <div className="alert alert-danger" role="alert">{mensajeError}</div>}
            <div className="mb-3">
              <label htmlFor="name" className="form-label" aria-label="Nombre">Nombre</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                aria-required="true"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" aria-label="Correo electrónico">Correo electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                aria-required="true"
                value={emailRegistro} 
                onChange={(e) => setEmailRegistro(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" aria-label="Contraseña">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                aria-required="true"
                value={contrasenaRegistro} 
                onChange={(e) => setContrasenaRegistro(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label" aria-label="Confirmar contraseña">Confirmar contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                id="confirmPassword" 
                aria-required="true"
                value={confirmarContrasena} 
                onChange={(e) => setConfirmarContrasena(e.target.value)} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rol" className="form-label" aria-label="Rol">Rol</label>
              <select 
                className="form-select" 
                id="rol" 
                aria-required="true"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="">Selecciona un rol</option>
                <option value="alumno">Alumno</option>
                <option value="tutor">Tutor</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="preferencia" className="form-label" aria-label="Preferencia de accesibilidad">Preferencia</label>
              <select
                className="form-select"
                id="preferencia"
                aria-required="true"
                value={preferencia}
                onChange={(e) => setPreferencia(e.target.value)}
              >
                <option value="">Selecciona una preferencia</option>
                {/* Se cambian los valores a los IDs numéricos esperados por el backend */}
                <option value="1">Auditivo</option>
                <option value="2">Visual</option>
                <option value="3">Motriz</option>
              </select>
            </div>
            <button type="submit" className="w-100 btn btn-primary mt-4" disabled={loading} aria-busy={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              )}
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        )}
        <div className="text-center mt-3">
          <button onClick={toggleForm} className="btn btn-link text-secondary text-decoration-none">
            {isLogin ? "¿No tienes cuenta? Regístrate aquí." : "¿Ya tienes una cuenta? Inicia sesión aquí."}
          </button>
        </div>
        <button onClick={onBack} className="btn btn-link mt-3 text-secondary text-decoration-none">
          Regresar a la página principal
        </button>
  </div>
    </div>
  );
}