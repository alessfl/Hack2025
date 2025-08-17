import React from 'react';

export default function ConsoleDisplay({ logs }) {
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono overflow-auto h-64 mt-8">
      <h3 className="text-xl font-bold mb-2">Registro de Eventos</h3>
      {logs.map((log, index) => (
        <div key={index} className="text-sm border-b border-gray-700 py-1 last:border-b-0">
          {log}
        </div>
      ))}
    </div>
  );
}