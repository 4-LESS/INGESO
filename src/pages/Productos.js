// src/pages/Productos.js
import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos"; // Hook para cargar productos desde un archivo CSV
import SearchBar from "../components/SearchBar"; // Barra de búsqueda
import ProductFilters from "../components/ProductFilters"; // Filtros de productos
import PaginatedProducts from "../components/PaginatedProducts"; // Componente de paginación
import ProductDetails from "../components/ProductDetails"; // Detalles de un producto
import useFilteredProducts from "../hooks/useFilteredProducts"; // Hook para aplicar filtros
import { Routes, Route } from "react-router-dom"; // Para manejar rutas

const Productos = () => {
  // Estado y lógica para cargar productos
  const { productos, isLoading, error } = useProductos();

  // Lógica para filtrar productos
  const {
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
  } = useFilteredProducts(productos);

  // Estado para la página actual (paginación)
  const [currentPage, setCurrentPage] = useState(1);

  // Mostrar un spinner mientras se cargan los productos
  if (isLoading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  // Mostrar un mensaje de error si ocurre algún problema al cargar los productos
  if (error) {
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Renderizar las rutas de la página
  return (
    <Routes>
      {/* Ruta principal: muestra todos los productos */}
      <Route
        path="/"
        element={
          <Container className="my-4">
            <h1 className="mb-4">Productos</h1>
            {/* Barra de búsqueda */}
            <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
            {/* Filtros de producto */}
            <ProductFilters
              lineaOptions={lineaOptions}
              grupoOptions={grupoOptions}
              selectedLinea={selectedLinea}
              selectedGrupo={selectedGrupo}
              onLineaChange={handleLineaChange}
              onGrupoChange={handleGrupoChange}
            />
            {/* Botón para resetear filtros */}
            <div className="d-flex justify-content-end my-3">
              <Button variant="secondary" onClick={resetFilters}>
                Resetear Filtros
              </Button>
            </div>
            <PaginatedProducts
              productos={filteredProducts}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </Container>
        }
      />
      {/* Ruta para los detalles del producto */}
      <Route path="/producto/:productId" element={<ProductDetails />} />
    </Routes>
  );
  };        
export default Productos;