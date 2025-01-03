// src/pages/Contacto.js

// Componente de formulario de contacto que permite a los usuarios enviar su nombre, correo electrónico y un mensaje.
// Incluye validación de formulario

import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Contacto() {
  const [validated, setValidated] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const manejarSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario envíe datos
    event.stopPropagation(); // Detiene cualquier propagación adicional
    setValidated(true);
    setShowMessage(true); // Muestra el mensaje
  };

  return (
    <Container className="my-4 contacto">
      <h1 className="text-center mb-4">Contáctanos</h1>
      <p className="text-center lead">
        ¿Tienes alguna pregunta, sugerencia o simplemente quieres decirnos algo?
        Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>

      {showMessage && (
        <Alert variant="info" onClose={() => setShowMessage(false)} dismissible>
          ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
        </Alert>
      )}

      <div className="info-section my-4">
        <h2>Nuestros canales de atención</h2>
        <p>
          Si necesitas asistencia inmediata, también puedes contactarnos a través de los siguientes medios:
        </p>
        <ul>
          <li>
            <strong>Teléfono:</strong> +56 9 1234 5678
          </li>
          <li>
            <strong>Correo electrónico:</strong>{" "}
            <a href="mailto:contacto@farmaahorro.cl">contacto@farmaahorro.cl</a>
          </li>
          <li>
            <strong>Redes sociales:</strong> Encuéntranos en Facebook e Instagram como <em>@FarmaAhorroCL</em>.
          </li>
        </ul>
        <p>
          Nuestro equipo está disponible para responder tus consultas de lunes a viernes de 9:00 a 18:00 horas.
        </p>
      </div>

      <Form noValidate validated={validated} onSubmit={manejarSubmit} className="mt-4">
        <h2>Formulario de contacto</h2>
        <p>
          Completa la información a continuación y cuéntanos cómo podemos ayudarte. Nos encanta escuchar de nuestros clientes.
        </p>

        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control required type="text" placeholder="Ingresa tu nombre" />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa tu nombre.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="nombre@ejemplo.com"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un correo electrónico válido.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formMensaje" className="mt-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={4}
            placeholder="Escribe tu mensaje aquí"
          />
          <Form.Control.Feedback type="invalid">
            Por favor ingresa un mensaje.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default Contacto;

