// Hook personalizado para cargar datos de productos desde una API.
// Si un producto no tiene una imagen definida, asigna un placeholder generado dinámicamente.

/* No podemos usar la API en el entorno de produccion
import { useState, useEffect } from "react";
import { getPlaceholderImage } from "../utils/helpers";

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

        // Agregar imágenes placeholder si no tienen una imagen válida
        const parsedProductos = data.map((item) => ({
          ...item,
          image: item.image || getPlaceholderImage(item.id),
        }));

        setProductos(parsedProductos); // Actualiza los productos en el estado
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
};*/
// De momento, se regresa al uso del CSV
// Utiliza PapaParse para analizar el CSV y devuelve un array de productos, estado de carga y manejo de errores.

import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { getProductImage } from "../utils/helpers";

export const useProductos = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos cargados
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si la carga está en progreso
  const [error, setError] = useState(null); // Estado para almacenar mensajes de error si ocurre alguno

  // Función para cargar y procesar el archivo CSV de productos
  const loadProductos = useCallback(async () => {
    try {
      // Intenta obtener el archivo CSV desde el directorio de datos públicos
      const response = await fetch("/inventario.csv");
      if (!response.ok) throw new Error("Network response was not ok");

      // Convierte el buffer de datos en texto para ser analizado
      const buffer = await response.arrayBuffer();
      const csvText = new TextDecoder('windows-1252').decode(buffer); // Decodificación adecuada según el archivo

      // Usa PapaParse para analizar el CSV en un formato de array de objetos
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Mapea los datos del CSV a un formato estandarizado de producto
          const parsedProductos = results.data
            .filter(item => item.DETALLE && item.PRECIO) // Filtra los productos válidos
            .map(item => ({
              id: item.CODIGO || Math.random().toString(36).substr(2, 9), // Genera un ID único si no existe
              nombre: item.DETALLE,
              stock: item.STOCK || "0",
              precio: item.PRECIO,
              LINEA: item.LINEA || "Sin LINEA",
              GRUPO: item.GRUPO || "Sin GRUPO",
              image: getProductImage(item.CODIGO || Math.random().toString(36).substr(2, 9)), // Asigna una imagen placeholder
            }));
          setProductos(parsedProductos); // Actualiza el estado con los productos analizados
          setIsLoading(false); // Indica que la carga ha terminado
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setError("Hubo un problema al parsear los productos."); // Guarda el mensaje de error
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error al cargar el archivo CSV:", err);
      setError("Hubo un problema al cargar los productos."); // Guarda un mensaje de error de carga
      setIsLoading(false);
    }
  }, []);

  // Ejecuta loadProductos cuando se monta el hook para cargar los productos
  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Devuelve los productos, el estado de carga y los mensajes de error para usarse en el componente
  return { productos, isLoading, error };
};
