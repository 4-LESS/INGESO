// src/components/SearchBar.js

// Componente de barra de búsqueda que permite a los usuarios buscar productos.
// Incluye un ícono de búsqueda y envía el término de búsqueda al hacer submit o cambiar el valor.
// Utiliza react-bootstrap para el diseño del campo de búsqueda e ícono.

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
          onChange={manejarCambio}
          className="rounded-pill"
        />
        {/* Ícono de búsqueda dentro del campo */}
        <InputGroup.Text
          className="bg-transparent border-0 search-icon"
          onClick={() => onSearchSubmit(termino)} // Activa la búsqueda al hacer clic
          style={{ cursor: "pointer" }} // Cambia el cursor a pointer para indicar que es clickeable
        >
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}

// Actualizamos los PropTypes
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Función llamada en cada cambio de búsqueda (si se usa)
  onSearchSubmit: PropTypes.func.isRequired, // Función llamada al hacer submit
  defaultValue: PropTypes.string, // Valor inicial del término de búsqueda
};

export default SearchBar;