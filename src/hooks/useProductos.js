import { useState, useEffect } from "react";

export const useProductos = () => {
  const [productos, setProductos] = useState([]); // Lista de productos
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setIsLoading(true); // Inicia el estado de carga
        setError(null); // Reinicia el estado de error

        // Llamada a la API del backend
        const response = await fetch("http://localhost:3000/api/inventory");
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API.");
        }

        const data = await response.json(); // Convertir respuesta a JSON
        setProductos(data); // Actualiza los productos en el estado
      } catch (err) {
        console.error("Error al cargar los productos:", err);
        setError("No se pudieron cargar los productos."); // Guarda el mensaje de error
      } finally {
        setIsLoading(false); // Finaliza el estado de carga
      }
    };

    fetchProductos(); // Llama a la función para cargar los productos al montar el componente
  }, []); // El array vacío asegura que se ejecuta solo una vez al montar

  return { productos, isLoading, error }; // Devuelve los estados para usar en otros componentes
};