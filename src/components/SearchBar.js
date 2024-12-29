// src/components/SearchBar.js

// Componente de barra de búsqueda que permite a los usuarios buscar productos.
// Incluye un ícono de búsqueda y envía el término de búsqueda al hacer submit o clic en el ícono.

import React, { useState, useEffect } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function SearchBar({ onSearchSubmit, defaultValue = "" }) {
  const [termino, setTermino] = useState(defaultValue);

  useEffect(() => {
    setTermino(defaultValue);
  }, [defaultValue]);

  const manejarCambio = (e) => {
    setTermino(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(termino);
  };

  return (
    <Form className="d-flex my-3" onSubmit={manejarSubmit}>
      <InputGroup className="search-bar">
        <FormControl
          type="search"
          placeholder="Buscar productos..."
          aria-label="Buscar"
          value={termino}
          onChange={manejarCambio} // Cambios en el campo de búsqueda
          className="rounded-pill"
        />
        {/* Ícono de búsqueda que activa la búsqueda al hacer clic */}
        <InputGroup.Text
          className="bg-transparent border-0 search-icon"
          onClick={() => onSearchSubmit(termino)}
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

// PropTypes actualizados
SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired, // Función llamada al hacer submit o clic en el ícono
  defaultValue: PropTypes.string,           // Valor inicial del término de búsqueda
};

export default SearchBar;
