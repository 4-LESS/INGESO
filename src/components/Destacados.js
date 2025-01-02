// src/components/Destacados.js

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { getProductImage } from "../utils/helpers";

function Destacados() {
  const { productos, isLoading, error } = useProductos();
  const [imageUrls, setImageUrls] = useState({});

  // Define destacadosIds dentro de un useMemo
  const destacadosIds = useMemo(() => [12281, 9070, 15478, 861102, 32404, 41267, 69053, 865023], []);

  // Filtrar productos destacados
  const destacados = useMemo(() => {
    return productos.filter((producto) =>
      destacadosIds.includes(Number(producto.id))
    );
  }, [productos, destacadosIds]);

  // Cargar imágenes con caché
  useEffect(() => {
    const fetchImages = async () => {
      const cachedUrls = JSON.parse(localStorage.getItem("imageUrls") || "{}");
      const urls = { ...cachedUrls };

      await Promise.all(
        destacados.map(async (producto) => {
          if (!urls[producto.id]) {
            const url = await getProductImage(producto.id);
            urls[producto.id] = url;
          }
        })
      );

      setImageUrls(urls);
      localStorage.setItem("imageUrls", JSON.stringify(urls));
    };

    if (destacados.length > 0) {
      fetchImages();
    }
  }, [destacados]);

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

  return (
    <Container className="my-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <h2 className="text-center mb-5" style={{ fontWeight: "600", color: "#333" }} data-aos="fade-up">
        Productos Destacados
      </h2>
      {destacados.length > 0 ? (
        <Row>
          {destacados.map((producto) => (
            <Col key={producto.id} md={3} className="mb-4" data-aos="fade-up">
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
                    src={imageUrls[producto.id] || "https://via.placeholder.com/300x300"}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      height: "300px",
                      width: "100%",
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
