import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFilteredProducts = (productos) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para almacenar los valores de los filtros
  const [searchTerm, setSearchTerm] = useState(""); // Almacena el término de búsqueda
  const [selectedLinea, setSelectedLinea] = useState(null); // Almacena la línea seleccionada
  const [selectedGrupo, setSelectedGrupo] = useState(null); // Almacena el grupo seleccionado

  // Inicializa los filtros basados en los parámetros de URL al montar el hook
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const linea = params.get("line") || "";
    const grupo = params.get("group_name") || "";

    setSearchTerm(search);

    if (linea) {
      setSelectedLinea({ value: linea, label: linea });
    }

    if (grupo) {
      setSelectedGrupo({ value: grupo, label: grupo });
    }
  }, [location.search]);

  // Genera opciones únicas para el filtro de línea basadas en los productos disponibles
  const lineaOptions = useMemo(() => {
    const uniqueLineas = Array.from(new Set(productos.map(p => p.line || "Sin Línea"))); // Manejar valores faltantes
    return uniqueLineas.map(linea => ({
      value: linea,
      label: linea,
    }));
  }, [productos]);

  // Genera opciones únicas para el filtro de grupo basadas en la línea seleccionada
  const grupoOptions = useMemo(() => {
    if (selectedLinea) {
      const filtered = productos.filter(p => p.line === selectedLinea.value);
      const uniqueGrupos = Array.from(new Set(filtered.map(p => p.group_name || "Sin Grupo"))); // Manejar valores faltantes
      return uniqueGrupos.map(grupo => ({
        value: grupo,
        label: grupo,
      }));
    }
    return [];
  }, [selectedLinea, productos]);

  // Filtra los productos en base al término de búsqueda, línea y grupo seleccionados
  const filteredProducts = useMemo(() => {
    return productos.filter(product => {
      const nombre = product.name || ""; // Manejar valores faltantes
      const matchesSearch = nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLinea = selectedLinea ? product.line === selectedLinea.value : true;
      const matchesGrupo = selectedGrupo ? product.group_name === selectedGrupo.value : true;
      return matchesSearch && matchesLinea && matchesGrupo;
    });
  }, [productos, searchTerm, selectedLinea, selectedGrupo]);

  // Actualiza el término de búsqueda y la URL
  const handleSearchSubmit = (term) => {
    setSearchTerm(term);
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    navigate(`/productos?${params.toString()}`);
  };

  // Actualiza la línea seleccionada y resetea el grupo si es necesario
  const handleLineaChange = (selected) => {
    setSelectedLinea(selected);
    setSelectedGrupo(null); // Restablece el grupo al cambiar la línea

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("linea", selected.value);
    } else {
      params.delete("linea");
    }
    params.delete("grupo"); // Elimina siempre el grupo al cambiar la línea
    navigate(`/productos?${params.toString()}`);
  };

  // Actualiza el grupo seleccionado y la URL
  const handleGrupoChange = (selected) => {
    setSelectedGrupo(selected);
    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("grupo", selected.value);
    } else {
      params.delete("grupo");
    }
    navigate(`/productos?${params.toString()}`);
  };

  // Restablece todos los filtros y actualiza la URL
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLinea(null);
    setSelectedGrupo(null);
    navigate(`/productos`);
  };

  // Retorna los productos filtrados, opciones de filtro y handlers para cambiar los filtros
  return {
    filteredProducts,
    searchTerm,
    handleSearchSubmit,
    lineaOptions,
    grupoOptions,
    selectedLinea,
    selectedGrupo,
    handleLineaChange,
    handleGrupoChange,
    resetFilters,
  };
};

export default useFilteredProducts;
