import React from 'react';

const Swatch = ({ hex, label }) => (
  <li className="d-flex align-items-center gap-3">
    <span className="rounded-4 border border-black-10" style={{ height: "1.75rem", width: "1.75rem", backgroundColor: hex }} aria-hidden></span>
    <span className="fs-6 font-monospace">{label} · {hex}</span>
  </li>
);

export default Swatch;
