// src/hooks/useFilteredProducts.js
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useFilteredProducts = (productos) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para los filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLinea, setSelectedLinea] = useState(null);
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  // Parsear los parámetros de la URL al montar el hook
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const linea = params.get("linea") || "";
    const grupo = params.get("grupo") || "";

    setSearchTerm(search);

    if (linea) {
      setSelectedLinea({ value: linea, label: linea });
    }

    if (grupo) {
      setSelectedGrupo({ value: grupo, label: grupo });
    }
  }, [location.search]);

  // Generar opciones únicas para LINEA
  const lineaOptions = useMemo(() => {
    const uniqueLineas = Array.from(new Set(productos.map(p => p.LINEA)));
    return uniqueLineas.map(linea => ({
      value: linea,
      label: linea,
    }));
  }, [productos]);

  // Generar opciones únicas para GRUPO basado en LINEA seleccionada
  const grupoOptions = useMemo(() => {
    if (selectedLinea) {
      const filtered = productos.filter(p => p.LINEA === selectedLinea.value);
      const uniqueGrupos = Array.from(new Set(filtered.map(p => p.GRUPO)));
      return uniqueGrupos.map(grupo => ({
        value: grupo,
        label: grupo,
      }));
    }
    return [];
  }, [selectedLinea, productos]);

  // Filtrar productos basado en searchTerm, LINEA y GRUPO
  const filteredProducts = useMemo(() => {
    return productos.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLinea = selectedLinea ? product.LINEA === selectedLinea.value : true;
      const matchesGrupo = selectedGrupo ? product.GRUPO === selectedGrupo.value : true;
      return matchesSearch && matchesLinea && matchesGrupo;
    });
  }, [productos, searchTerm, selectedLinea, selectedGrupo]);

  // Handlers para actualizar los filtros y la URL
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

  const handleLineaChange = (selected) => {
    setSelectedLinea(selected);
    setSelectedGrupo(null); // Resetear GRUPO cuando cambia LINEA

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("linea", selected.value);
    } else {
      params.delete("linea");
    }
    params.delete("grupo"); // Siempre eliminar GRUPO al cambiar LINEA
    navigate(`/productos?${params.toString()}`);
  };

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

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLinea(null);
    setSelectedGrupo(null);
    navigate(`/productos`);
  };

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

