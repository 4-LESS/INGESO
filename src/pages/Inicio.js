// src/pages/Inicio.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPills, faUserMd, faTruck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Anuncios from "../components/Anuncios";
import Destacados from "../components/Destacados"; // Importa el nuevo componente
import heroImage from "../assets/images/hero.png";
import "../styles/custom.scss"; 

function Inicio() {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const activeNotif = storedNotifications.find((notification) => notification.active);
    if (activeNotif) {
      setActiveNotification(activeNotif);
    }
  }, []);

  const closeNotification = () => {
    setActiveNotification(null);
  };

  return (
    <>
      {activeNotification && (
        <div className="notification-overlay" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <div className="notification-popup">
            <div className="notification-content">
              <p>{activeNotification.message}</p>
              <button onClick={closeNotification} className="btn-close" aria-label="Cerrar">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section: Mensaje de bienvenida */}
      <div 
        className="hero-section" 
        style={{
          fontFamily: 'Montserrat, sans-serif',
          minHeight: '60vh',
          padding: '80px 0',
          backgroundColor: '#fff',
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0" data-aos="fade-right">
              <h1 style={{ fontWeight: '600', fontSize: '2.5rem', color: '#2954a3' }}>
                Bienvenido a FarmAhorro
              </h1>
              <p style={{ fontWeight: '300', fontSize: '1.1rem', color: '#333', marginTop: '20px' }}>
                Tu salud es nuestra prioridad
              </p>
            </Col>
            <Col md={6} className="text-center" data-aos="fade-left">
              <img 
                src={heroImage} 
                alt="Salud e higiene" 
                style={{ maxWidth: '100%', height: 'auto' }} 
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de anuncios */}
      <Container className="my-5" style={{ fontFamily: 'Montserrat, sans-serif' }} data-aos="fade-up">
        <Anuncios />
      </Container>

      {/* Sección de productos destacados (ahora en un componente aparte) */}
      <Destacados />

      {/* Sección de características/servicios */}
      <Container className="my-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        <h2 className="text-center mb-5" style={{ fontWeight: '600', color: '#333' }} data-aos="fade-up">
          Nuestros Servicios
        </h2>
        <Row className="text-center">
          <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <div 
              className="feature-card p-4 h-100" 
              style={{ 
                borderRadius: '10px', 
                background: '#fff', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <FontAwesomeIcon icon={faPills} size="3x" className="mb-3" style={{ color: '#2954a3' }} />
              <h3 style={{ fontWeight: '500', color: '#333' }}>Variedad</h3>
              <p style={{ fontWeight: '300', fontSize: '0.95rem', color: '#555' }}>
                Amplia gama de productos farmacéuticos.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <div 
              className="feature-card p-4 h-100" 
              style={{ 
                borderRadius: '10px', 
                background: '#fff', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3" style={{ color: '#2954a3' }} />
              <h3 style={{ fontWeight: '500', color: '#333' }}>Profesionales</h3>
              <p style={{ fontWeight: '300', fontSize: '0.95rem', color: '#555' }}>
                Atención personalizada por expertos.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <div 
              className="feature-card p-4 h-100" 
              style={{ 
                borderRadius: '10px', 
                background: '#fff', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <FontAwesomeIcon icon={faTruck} size="3x" className="mb-3" style={{ color: '#2954a3' }} />
              <h3 style={{ fontWeight: '500', color: '#333' }}>Envíos</h3>
              <p style={{ fontWeight: '300', fontSize: '0.95rem', color: '#555' }}>
                Entrega a domicilio rápida y segura.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </>
  );
}

export default Inicio;
