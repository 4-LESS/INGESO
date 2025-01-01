import React from "react";

const Estadisticas = () => {
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
    <div className="admin-section" style={{ textAlign: "center", padding: "20px" }}>
      <h2>Estadísticas y Reportes</h2>
      <p>Consulta estadísticas de ventas, usuarios y pedidos en tiempo real.</p>

       {/* Incrusta el informe de Google Data Studio */}
      <iframe
        title="Estadísticas"
        width="600"
        height="450"
        src="https://lookerstudio.google.com/embed/reporting/725d70e6-ccc2-4317-a9f8-02c5b1159fac/page/dmYaE"
        frameBorder="0"
        style={{
          border: "0",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
        allowFullScreen
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
     
      {/* Enlace alternativo para abrir en otra pestaña */}
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://lookerstudio.google.com/reporting/725d70e6-ccc2-4317-a9f8-02c5b1159fac/page/dmYaE"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#007BFF",
            fontWeight: "bold",
          }}
        >
          Abrir Informe en otra pestaña
        </a>
      </div>
    </div>
  );
};

export default Estadisticas;
