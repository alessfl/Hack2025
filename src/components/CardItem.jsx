export default function CardItem({ title, description, darkMode }) {
  return (
    <div className={`card h-100 shadow-sm ${darkMode ? "bg-secondary text-light" : ""}`}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text flex-grow-1">{description}</p>
        <div className="mt-auto">
          <button className="btn btn-primary btn-sm me-2">Ver más</button>
          <button className="btn btn-outline-danger btn-sm">Eliminar</button>
        </div>
      </div>
    </div>
  );
}
