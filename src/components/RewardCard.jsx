import React from 'react';

const RewardCard = ({ title, description, points, locked, darkMode }) => (
  <div className={`rounded-5 p-4 border ${locked ? "border-dashed opacity-80" : "border-solid"} border-black-10 shadow-sm ${darkMode ? "bg-dark text-light border-light-50" : "bg-white"}`} role="group" aria-label={`Recompensa ${title}`}>
    <div className="d-flex align-items-center justify-content-between">
      <h3 className="fw-bold text-primary mb-0">{title}</h3>
      <div className={`fs-6 d-flex align-items-center gap-2 ${darkMode ? "text-light" : ""}`} aria-label={`Requiere ${points} puntos`}>
        <i className="fa-solid fa-trophy text-secondary"></i>
        {points} pts
      </div>
    </div>
    <p className={`mt-2 fs-6 ${darkMode ? "text-light-80" : "text-dark-80"}`}>{description}</p>
    <button
      disabled={locked}
      className={`mt-3 w-100 btn fw-medium focus-visible:ring-2 focus-visible:ring-primary ${locked ? "btn-light text-muted cursor-not-allowed" : "btn-primary hover-opacity-90"}`}
    >
      {locked ? "Próximamente" : "Canjear"}
    </button>
  </div>
);

export default RewardCard;
