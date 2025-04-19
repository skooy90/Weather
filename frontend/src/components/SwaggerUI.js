import React, { useEffect } from 'react';
import { SWAGGER_CONFIG } from '../config/swagger';

const SwaggerUI = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js';
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'https://unpkg.com/swagger-ui-dist@3/swagger-ui.css';
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div id="swagger-ui" style={{ height: '100vh', width: '100%' }} />
  );
};

export default SwaggerUI; 