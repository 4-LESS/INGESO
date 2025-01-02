// src/components/PaginatedProducts.js

import React, { useMemo, useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginationComponent from "./PaginationComponent";
import { getProductImage } from "../utils/helpers";

const ITEMS_PER_PAGE = 12;

const PaginatedProducts = ({ productos, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return productos.slice(start, start + ITEMS_PER_PAGE);
  }, [productos, currentPage]);

  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const cachedUrls = JSON.parse(localStorage.getItem("imageUrls") || "{}");
      const urls = { ...cachedUrls };

      await Promise.all(
        currentItems.map(async (item) => {
          if (!urls[item.id]) {
            const url = await getProductImage(item.id);
            urls[item.id] = url;
          }
        })
      );

      setImageUrls(urls);
      localStorage.setItem("imageUrls", JSON.stringify(urls));
    };

    if (currentItems.length > 0) {
      fetchImages();
    }
  }, [currentItems]);

  return (
    <>
      <Row>
        {currentItems.map(({ id, nombre, stock, precio }) => (
          <Col key={id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={imageUrls[id] || "https://via.placeholder.com/300x300"}
                loading="lazy" // Lazy Loading
                alt={nombre}
                style={{
                  objectFit: "cover",
                  height: "300px",
                  width: "100%",
                }}
              />
              <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>
                  {stock === "0" ? "Agotado" : stock <= 3 ? "¡Quedan pocas unidades!" : "Disponible"}
                </Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${precio}
                </Card.Text>
                <Link to={`/producto/${id}`} className="btn btn-primary">
                  Ver detalles
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default PaginatedProducts;

