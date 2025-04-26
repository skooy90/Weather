import React, { useEffect } from 'react';
import { SWAGGER_CONFIG } from '../config/swagger';

const SwaggerUI = () => {
  useEffect(() => {
    const ui = SwaggerUIBundle({
      ...SWAGGER_CONFIG,
      url: 'https://weather-backend-knii.onrender.com/api-docs',
    });
  }, []);

  return <div id="swagger-ui" />;
};

export default SwaggerUI; 