import React from "react";

const Estadisticas = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Estadísticas de Búsquedas</h2>
      <p>Gráficos en tiempo real sobre las búsquedas realizadas en la página.</p>
      
      {/* Incrusta el informe de Google Data Studio */}
      <iframe
        title="Estadísticas"
        width="100%"  // Cambiado a 100% para que sea responsive
        height="600px" // Altura ajustada para mayor visibilidad
        src="https://lookerstudio.google.com/reporting/725d70e6-ccc2-4317-a9f8-02c5b1159fac"
        frameBorder="0"
        style={{
          border: "none",
          borderRadius: "8px", // Esquinas redondeadas
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra para mejor diseño
        }}
        allowFullScreen
      ></iframe>
      
      {/* Enlace alternativo para abrir en otra pestaña */}
      <div style={{ marginTop: "20px" }}>
        <a
          href="https://lookerstudio.google.com/reporting/725d70e6-ccc2-4317-a9f8-02c5b1159fac"
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
