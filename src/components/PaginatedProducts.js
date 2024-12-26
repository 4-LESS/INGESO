import React, { useMemo } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        {currentItems.map(({ id, name, stock, price, image}) => (
          <Col key={id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={image}
                alt={name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  {stock === "0" ? "Agotado" : `Stock: ${stock}`}{" "}
                  {stock <= 3 && <span className="pocas-unidades">¡Quedan pocas unidades!</span>}
                </Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${price}
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

