// src/components/ProductFilters.js

import React from "react";
import Select from "react-select";
import { Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const ProductFilters = ({
  categoriaOptions,
  subcategoriaOptions,
  subSubcategoriaOptions,
  selectedCategoria,
  selectedSubcategoria,
  selectedSubSubcategoria,
  onCategoriaChange,
  onSubcategoriaChange,
  onSubSubcategoriaChange,
}) => {
  // Logs para depurar
  console.log("[ProductFilters] Render");
  console.log("  categoríaOptions:", categoriaOptions);
  console.log("  subcategoriaOptions:", subcategoriaOptions);
  console.log("  subSubcategoriaOptions:", subSubcategoriaOptions);
  console.log("  selectedCategoria:", selectedCategoria);
  console.log("  selectedSubcategoria:", selectedSubcategoria);
  console.log("  selectedSubSubcategoria:", selectedSubSubcategoria);

  return (
    <Row className="mb-4">
      {/* Selector de Categoría */}
      <Col md={4} className="mb-2">
        <Form.Label>
          <strong>Filtrar por Categoría</strong>
        </Form.Label>
        <Select
          options={categoriaOptions}
          value={selectedCategoria}
          onChange={(selected) => {
            console.log("[ProductFilters] Cambio en Categoría:", selected);
            onCategoriaChange(selected);
          }}
          isClearable
          placeholder="Selecciona una Categoría..."
          className="basic-select"
        />
      </Col>

      {/* Selector de Subcategoría */}
      <Col md={4} className="mb-2">
        <Form.Label>
          <strong>Filtrar por Subcategoría</strong>
        </Form.Label>
        <Select
          options={subcategoriaOptions}
          value={selectedSubcategoria}
          onChange={(selected) => {
            console.log("[ProductFilters] Cambio en Subcategoría:", selected);
            onSubcategoriaChange(selected);
          }}
          isClearable
          isDisabled={!selectedCategoria}
          placeholder={
            selectedCategoria
              ? "Selecciona una Subcategoría..."
              : "Selecciona una Categoría primero"
          }
          className="basic-select"
        />
      </Col>

      {/* Selector de Sub-subcategoría */}
      <Col md={4} className="mb-2">
        <Form.Label>
          <strong>Filtrar por Detalle</strong>
        </Form.Label>
        <Select
          options={subSubcategoriaOptions}
          value={selectedSubSubcategoria}
          onChange={(selected) => {
            console.log("[ProductFilters] Cambio en Sub-subcategoría:", selected);
            onSubSubcategoriaChange(selected);
          }}
          isClearable
          isDisabled={!selectedSubcategoria}
          placeholder={
            selectedSubcategoria
              ? "Selecciona un Detalle..."
              : "Selecciona una Subcategoría primero"
          }
          className="basic-select"
        />
      </Col>
    </Row>
  );
};

ProductFilters.propTypes = {
  categoriaOptions: PropTypes.array.isRequired,
  subcategoriaOptions: PropTypes.array.isRequired,
  subSubcategoriaOptions: PropTypes.array.isRequired,
  selectedCategoria: PropTypes.object,
  selectedSubcategoria: PropTypes.object,
  selectedSubSubcategoria: PropTypes.object,
  onCategoriaChange: PropTypes.func.isRequired,
  onSubcategoriaChange: PropTypes.func.isRequired,
  onSubSubcategoriaChange: PropTypes.func.isRequired,
};

export default ProductFilters;


