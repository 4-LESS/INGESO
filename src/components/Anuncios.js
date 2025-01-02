// src/components/Anuncios.js

import React, { useEffect, useState } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';

function Anuncios() {
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch de las imágenes desde el bucket
    const fetchNovedades = async () => {
      try {
        const response = await fetch('https://anuncios-farmaahorro.s3.us-east-2.amazonaws.com/anuncios.json');
        if (!response.ok) throw new Error('No se pudieron cargar los anuncios');
        const data = await response.json();
        setNovedades(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNovedades();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Cargando anuncios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div 
      style={{ 
        borderRadius: '10px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
      }}
    >
      <Carousel 
        interval={4000} 
        pause={true} 
        controls={true} 
        indicators={true}
        variant="dark"
      >
        {novedades.map((item, index) => (
          <Carousel.Item key={index}>
            <div style={{ position: 'relative' }}>
              <img
                className="d-block w-100"
                src={item.src}
                alt={item.alt}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '550px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Anuncios;

