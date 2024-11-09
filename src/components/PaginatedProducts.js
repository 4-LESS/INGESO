// src/components/PaginatedProducts.js

import React, { useMemo } from "react";
import { Row, Col, Card, Button} from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";


const ITEMS_PER_PAGE = 12;

const PaginatedProducts = ({ productos, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(productos.length / ITEMS_PER_PAGE);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return productos.slice(start, start + ITEMS_PER_PAGE);
  }, [productos, currentPage]);

  return (
    <>
      <Row>
        {currentItems.map(({ id, nombre, stock, precio, image }) => (
          <Col key={id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={image} alt={nombre} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{nombre}</Card.Title>
                <Card.Text>{stock === "0" ? "Agotado" : `Stock: ${stock}`}</Card.Text>
                <Card.Text>Precio: ${precio}</Card.Text>
                <Button variant="primary">Ver detalles</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
    </>
  );
};

export default PaginatedProducts;