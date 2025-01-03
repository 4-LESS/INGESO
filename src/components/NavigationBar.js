// src/components/NavigationBar.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import ModalSucursales from './ModalSucursales';
import CarritoIcon from "./CarritoIcon";
import UserMenu from "./UserMenu";
import DropdownMenu from "./DropDownMenu"; // Importa el menú dinámico
import { CSSTransition } from "react-transition-group";
import "../styles/SharedMenuStyles.scss";

function NavigationBar() {
  const [showSucursales, setShowSucursales] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(false); // Controla si el menú es visible
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenSucursales = () => setShowSucursales(true);
  const handleCloseSucursales = () => setShowSucursales(false);

  const handleSearchSubmit = (termino) => {
    if (termino) {
      setSearchTerm(termino);
      navigate(`/productos?search=${encodeURIComponent(termino)}`);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    setSearchTerm("");
  }, [location.pathname]);

  useEffect(() => {
    if (!location.pathname.startsWith("/productos")) {
      const params = new URLSearchParams(location.search);
      if (params.has("search")) {
        params.delete("search");
        navigate({
          pathname: location.pathname,
          search: params.toString(),
        });
      }
    }
  }, [location, navigate]);

  return (
    <>
      {/* Barra de navegación superior */}
      <div className="navbar-top py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link to="/">
              <img
                src={require("../assets/images/logo_farmaahorro.png")}
                alt="FarmAhorro Logo"
                style={{ width: "150px", marginRight: "30px" }}
              />
            </Link>
            <div className="navigation-menu">
              <div className="menu-toggle" onClick={toggleMenu}>
                <div className="menu-circle">
                  <FontAwesomeIcon icon={faBars} className="text-white" style={{ fontSize: "20px" }} />
                </div>
                <span className="ms-2 text-secondary">Menú</span>
              </div>

              <CSSTransition
                in={menuVisible}
                timeout={300}
                classNames="dropdown"
                unmountOnExit
              >
                <div className="navigation-dropdown">
                  <DropdownMenu /> {/* Inserta el menú dinámico aquí */}
                </div>
              </CSSTransition>
            </div>
          </div>
          <div className="mx-3" style={{ flexGrow: 1 }}>
            <SearchBar onSearchSubmit={handleSearchSubmit} defaultValue={searchTerm} />
          </div>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" className="icono-sucursales" />
            <span className="button-sucursales" onClick={handleOpenSucursales}>Sucursales</span>
            <CarritoIcon />
            {/* Menú de usuario */}
            <UserMenu />
          </div>
        </Container>
      </div>

      {/* Barra de navegación inferior */}
      <Navbar className="navbar-bottom" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/sobre-nosotros">Sobre Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de Sucursales */}
      <ModalSucursales show={showSucursales} onHide={handleCloseSucursales} />
    </>
  );
}

export default NavigationBar;

