// src/components/Destacados.js

// Crea un componente en la pagina principal donde se muestran medicamentos destacados

import React from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function Destacados() {
  const { productos, isLoading, error } = useProductos();

  if (isLoading) {
    return (
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          position: "relative",
          textAlign: "center",
        }}
      >
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando productos destacados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  // Tomar los primeros 12 productos
  const destacados = productos.slice(0, 8);

  return (
    <Container className="my-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <h2 className="text-center mb-5" style={{ fontWeight: "600", color: "#333" }} data-aos="fade-up">
        Productos Destacados
      </h2>
      {destacados.length > 0 ? (
        <Row>
          {destacados.map((producto) => (
            <Col
              key={producto.id}
              md={3}
              className="mb-4"
              data-aos="fade-up"
            >
              <Link
                to={`/producto/${producto.id}`}
                className="text-decoration-none text-dark"
              >
                <Card
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={producto.image}
                    style={{
                      objectFit: "cover",
                      height: "200px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        fontWeight: "500",
                        fontSize: "1rem",
                        color: "#333",
                        textAlign: "center",
                      }}
                    >
                      {producto.nombre}
                    </Card.Title>
                    <Card.Text
                      style={{
                        fontWeight: "300",
                        color: "#555",
                        fontSize: "0.95rem",
                        textAlign: "center",
                      }}
                    >
                      ${producto.precio}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p style={{ fontWeight: "300", color: "#555" }}>No hay productos destacados disponibles.</p>
      )}
    </Container>
  );
}

export default Destacados;





