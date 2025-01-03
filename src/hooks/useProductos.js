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

// src/hooks/useProductos.js
import { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import { getProductImage } from "../utils/helpers"; // Ajusta según tu helper real
import { categoryMapping } from "../utils/categoryMapping"; // Ajusta según tu archivo de mapeo

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para asignar categoría, subcategoría y sub-subcategoría
  const mapCategorias = (producto) => {
    const findCategory = (mapping, linea, grupo) => {
      for (const [key, value] of Object.entries(mapping)) {
        if (value.codes?.includes(producto.CODIGO)) return { categoria: key };
        if (value.lineas?.includes(linea)) return { categoria: key };
        if (value.grupos?.includes(grupo)) return { categoria: key };
        if (value.subcategories) {
          const result = findCategory(value.subcategories, linea, grupo);
          if (result) {
            return {
              categoria: key,
              subcategoria: result.categoria,
              subsubcategoria: result.subcategoria || null,
            };
          }
        }
      }
      return null;
    };

    const result = findCategory(categoryMapping, producto.LINEA, producto.GRUPO);
    return (
      result || {
        categoria: "Otros",
        subcategoria: null,
        subsubcategoria: null,
      }
    );
  };

  // Carga el CSV
  const loadProductos = useCallback(async () => {
    try {
      const response = await fetch("/inventario.csv");
      if (!response.ok) throw new Error("Network response was not ok");

      const buffer = await response.arrayBuffer();
      // Decodifica con windows-1252 u otra codificación si es necesario
      const csvText = new TextDecoder("utf-8").decode(buffer);

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedProductos = results.data
            .filter((item) => item.DETALLE && item.PRECIO) // Filtra filas inválidas
            .map((item) => {
              const categorias = mapCategorias(item);
              return {
                id: item.CODIGO || Math.random().toString(36).substr(2, 9),
                nombre: item.DETALLE,
                stock: item.STOCK || "0",
                precio: item.PRECIO,
                categoria: categorias.categoria,
                subcategoria: categorias.subcategoria,
                subsubcategoria: categorias.subsubcategoria,
                LINEA: item.LINEA || "Sin LINEA",
                GRUPO: item.GRUPO || "Sin GRUPO",
                image: getProductImage(item.CODIGO || ""),
              };
            });

          setProductos(parsedProductos);
          setIsLoading(false);
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
          setError("Hubo un problema al parsear los productos.");
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error al cargar el archivo CSV:", err);
      setError("Hubo un problema al cargar los productos.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  return { productos, isLoading, error };
};

