import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useCarrito } from "../components/CarritoContext";
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import { getProductImage } from "../utils/helpers"; // Función para verificar las imágenes

const ProductDetails = () => {
  const { productId } = useParams();
  const { productos, isLoading, error } = useProductos();
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { agregarAlCarrito } = useCarrito();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && productos.length > 0) {
      const foundProduct = productos.find((item) => item.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
        getProductImage(foundProduct.id).then(setImageUrl);
      } else {
        console.error(`Producto con ID ${productId} no encontrado`);
      }
    }
  }, [isLoading, productos, productId]);

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando detalles...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center my-5">
        <p className="text-danger">Producto no encontrado</p>
        <Link to="/productos" className="btn btn-secondary">
          Volver a productos
        </Link>
      </Container>
    );
  }

  const handleAgregarBolsa = () => {
    agregarAlCarrito(product);
  };

  const handleComprarAhora = () => {
    agregarAlCarrito(product);
    navigate("/carrito");
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center">
          <img
            src={imageUrl || "https://via.placeholder.com/400"}
            alt={product.nombre || "Producto sin nombre"}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">{product.nombre || "Producto desconocido"}</h1>
          <h4 className="text-muted">Detalles del producto</h4>
          <h2 className="text-success mt-3">
            ${product.precio ? product.precio : "Precio no disponible"}
          </h2>
          {product.stock && product.stock <= 3 && (
            <Badge bg="warning" text="dark" className="mb-4">
              ¡Quedan pocas unidades!
            </Badge>
          )}
          {product.stock <= 3 && (
            <p className="pocas-unidades">¡Quedan pocas unidades!</p>
          )}
          <div className="my-4">
            <Button
              variant="success"
              size="lg"
              className="me-2"
              onClick={handleAgregarBolsa}
            >
              Agregar a la bolsa
            </Button>
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={handleComprarAhora}
            >
              Comprar ahora
            </Button>
          </div>
          <div className="mt-4">
            <h5>Disponible para:</h5>
            <ul className="list-unstyled">
              <li>
                <span className="text-success">✔ Despacho a domicilio</span>
              </li>
              <li>
                <span className="text-success">✔ Retiro en tienda</span>
              </li>
              <li>
                <span className="text-success">✔ Compra presencial</span>
              </li>
            </ul>
          </div>
          <Link to="/productos" className="btn btn-secondary mt-4">
            Volver a productos
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
