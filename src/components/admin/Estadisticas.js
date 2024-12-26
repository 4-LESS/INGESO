import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const Estadisticas = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://ingeso.onrender.com/api/analytics/hourly");
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data = await response.json();

      // Formatear datos para Chart.js
      const labels = data.map((entry) => `${entry.hour}:00`);
      const sessions = data.map((entry) => entry.sessions);

      setChartData({
        labels,
        datasets: [
          {
            label: "Búsquedas por Hora",
            data: sessions,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        chartData && (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
              },
            }}
          />
        )
      )}
    </div>
  );
};

export default Estadisticas;
