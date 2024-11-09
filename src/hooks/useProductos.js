// src/hooks/useProductos.js

// Hook personalizado para cargar datos de productos desde un archivo CSV en la carpeta public/data.
// Utiliza PapaParse para analizar el CSV y devuelve un array de productos, estado de carga y manejo de errores.

import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { getPlaceholderImage } from "../utils/helpers";

export const useProductos = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos cargados
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si la carga está en progreso
  const [error, setError] = useState(null); // Estado para almacenar mensajes de error si ocurre alguno

  // Función para cargar y procesar el archivo CSV de productos
  const loadProductos = useCallback(async () => {
    try {
      // Intenta obtener el archivo CSV desde el directorio de datos públicos
      const response = await fetch("/data/inventario.csv");
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
              image: getPlaceholderImage(item.CODIGO || Math.random().toString(36).substr(2, 9)), // Asigna una imagen placeholder
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
