// src/pages/Productos.js
import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { useProductos } from "../hooks/useProductos";
import useFilteredProducts from "../hooks/useFilteredProducts";

import ProductFilters from "../components/ProductFilters";
import PaginatedProducts from "../components/PaginatedProducts";
import ProductDetails from "../components/ProductDetails";

import { Routes, Route } from "react-router-dom";

const Productos = () => {
  const { productos, isLoading, error } = useProductos();

  // Extraemos todas las propiedades relevantes del hook
  const {
    filteredProducts,
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
  } = useFilteredProducts(productos);

  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Buscando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container className="my-4">
            <h1 className="mb-4">Productos</h1>

            <ProductFilters
              categoriaOptions={categoriaOptions}
              subcategoriaOptions={subcategoriaOptions} // Propiedad añadida
              subSubcategoriaOptions={subSubcategoriaOptions} // Propiedad añadida
              selectedCategoria={selectedCategoria}
              selectedSubcategoria={selectedSubcategoria} // Propiedad añadida
              selectedSubSubcategoria={selectedSubSubcategoria} // Propiedad añadida
              onCategoriaChange={handleCategoriaChange}
              onSubcategoriaChange={handleSubcategoriaChange} // Propiedad añadida
              onSubSubcategoriaChange={handleSubSubcategoriaChange} // Propiedad añadida
            />

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
      <Route path="/producto/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default Productos;
