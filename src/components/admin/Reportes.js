import React from "react";

// Componente para estadísticas y reportes
const Reportes = () => {
  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "estadisticas.png";
      link.click();
    } else {
      alert("No hay gráficos para descargar.");
    }
  };

  return (
    <div className="admin-section">
      <h2>Estadísticas y Reportes</h2>
      <p>Consulta estadísticas de ventas, usuarios y pedidos.</p>
      <button className="btn-primary" onClick={() => console.log("Ver Estadísticas")}>
        Ver Estadísticas
      </button>
      <button className="btn-secondary" onClick={handleDownload}>
        Descargar Estadísticas
      </button>
    </div>
  );
};

export default Reportes;
