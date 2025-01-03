import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryMapping } from "../utils/categoryMapping";

const useFilteredProducts = (productos) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estados de filtros
  const [searchTerm, setSearchTerm] = useState(""); // término de búsqueda
  const [selectedCategoria, setSelectedCategoria] = useState(null); // Categoría (nivel 1)
  const [selectedSubcategoria, setSelectedSubcategoria] = useState(null); // (nivel 2)
  const [selectedSubSubcategoria, setSelectedSubSubcategoria] = useState(null); // (nivel 3)

  // Función para normalizar strings (elimina mayúsculas, acentos, etc.)
  const normalize = (str = "") =>
    (str || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[\u0300-\u036f]/g, "");

  // Leer parámetros de URL al montar y cuando cambie la ruta
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const categoria = params.get("categoria") || "";
    const subcategoria = params.get("subcategoria") || "";
    const subSubcategoria = params.get("subsubcategoria") || "";

    setSearchTerm(search);

    // Actualizar estados según los parámetros
    if (categoria) {
      setSelectedCategoria({ value: categoria, label: categoria });
    } else {
      setSelectedCategoria(null);
    }

    if (subcategoria) {
      setSelectedSubcategoria({ value: subcategoria, label: subcategoria });
    } else {
      setSelectedSubcategoria(null);
    }

    if (subSubcategoria) {
      setSelectedSubSubcategoria({ value: subSubcategoria, label: subSubcategoria });
    } else {
      setSelectedSubSubcategoria(null);
    }
  }, [location.search]);

  // Genera las opciones del primer select (categorías) desde categoryMapping
  const categoriaOptions = useMemo(() => {
    console.log("Generando opciones de categorías...");
    const options = Object.keys(categoryMapping).map((cat) => ({
      value: cat,
      label: cat,
    }));
    console.log("Opciones de Categorías:", options);
    return options;
  }, []);

  // Genera opciones de subcategoría al seleccionar la categoría
  const subcategoriaOptions = useMemo(() => {
    if (!selectedCategoria) {
      console.log("Sin categoría seleccionada.");
      return [];
    }
    const catKey = selectedCategoria.value;
    const subcatsObj = categoryMapping[catKey]?.subcategories || {};
    console.log("Subcategorías para", catKey, subcatsObj);

    const options = Object.keys(subcatsObj).map((subcat) => ({
      value: subcat,
      label: subcat,
    }));
    console.log("Opciones de Subcategorías:", options);
    return options;
  }, [selectedCategoria]);

  // Genera opciones de sub-subcategoría al seleccionar la subcategoría
  const subSubcategoriaOptions = useMemo(() => {
    if (!selectedSubcategoria || !selectedCategoria) {
      console.log("Sin subcategoría seleccionada o categoría seleccionada.");
      return [];
    }
    const catKey = selectedCategoria.value;
    const subcatKey = selectedSubcategoria.value;
    const subsubObj =
      categoryMapping[catKey]?.subcategories[subcatKey]?.subcategories || {};

    console.log("Sub-subcategorías para", subcatKey, subsubObj);

    const options = Object.keys(subsubObj).map((subsub) => ({
      value: subsub,
      label: subsub,
    }));
    console.log("Opciones de Sub-subcategorías:", options);
    return options;
  }, [selectedCategoria, selectedSubcategoria]);

  // Filtra los productos
  const filteredProducts = useMemo(() => {
    console.log("=== Verificando coincidencias ===");
    const filtered = productos.filter((product) => {
      console.log(
        "producto:",
        product.nombre,
        "| categoria:",
        product.categoria,
        "| subcategoria:",
        product.subcategoria,
        "| subsubcategoria:",
        product.subsubcategoria
      );

      const matchesSearch = normalize(product.nombre).includes(
        normalize(searchTerm)
      );

      const matchCat = selectedCategoria
        ? normalize(product.categoria) === normalize(selectedCategoria.value)
        : true;

      const matchSub = selectedSubcategoria
        ? normalize(product.subcategoria) === normalize(selectedSubcategoria.value)
        : true;

      const matchSubSub = selectedSubSubcategoria
        ? normalize(product.subsubcategoria) === normalize(selectedSubSubcategoria.value)
        : true;

      const matched = matchesSearch && matchCat && matchSub && matchSubSub;
      console.log("¿Pasa el filtro?", matched);
      return matched;
    });

    console.log("Productos filtrados:", filtered);
    return filtered;
  }, [productos, searchTerm, selectedCategoria, selectedSubcategoria, selectedSubSubcategoria]);

  // Manejadores para actualizar estado + URL
  const handleCategoriaChange = (selected) => {
    console.log("Seleccionada Categoría:", selected);
    setSelectedCategoria(selected);
    setSelectedSubcategoria(null);
    setSelectedSubSubcategoria(null);

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("categoria", selected.value);
    } else {
      params.delete("categoria");
    }
    params.delete("subcategoria");
    params.delete("subsubcategoria");
    navigate(`/productos?${params.toString()}`);
  };

  const handleSubcategoriaChange = (selected) => {
    console.log("Cambio de Subcategoría, seleccionado:", selected);
    setSelectedSubcategoria(selected);
    setSelectedSubSubcategoria(null);

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("subcategoria", selected.value);
    } else {
      params.delete("subcategoria");
    }
    params.delete("subsubcategoria");
    navigate(`/productos?${params.toString()}`);
  };

  const handleSubSubcategoriaChange = (selected) => {
    console.log("Seleccionada Sub-subcategoría:", selected);
    setSelectedSubSubcategoria(selected);

    const params = new URLSearchParams(location.search);
    if (selected) {
      params.set("subsubcategoria", selected.value);
    } else {
      params.delete("subsubcategoria");
    }
    navigate(`/productos?${params.toString()}`);
  };

  const resetFilters = () => {
    console.log("Restableciendo filtros...");
    setSearchTerm("");
    setSelectedCategoria(null);
    setSelectedSubcategoria(null);
    setSelectedSubSubcategoria(null);
    navigate("/productos");
  };

  return {
    filteredProducts,
    searchTerm,
    handleSearchSubmit: setSearchTerm,
    categoriaOptions,
    subcategoriaOptions,
    subSubcategoriaOptions,
    selectedCategoria,
    selectedSubcategoria,
    selectedSubSubcategoria,
    handleCategoriaChange,
    handleSubcategoriaChange,
    handleSubSubcategoriaChange,
    resetFilters,
  };
};

export default useFilteredProducts;



