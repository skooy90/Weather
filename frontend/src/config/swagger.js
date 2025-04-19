// Swagger UI 설정
export const SWAGGER_CONFIG = {
  url: process.env.REACT_APP_API_URL + '/api-docs/swagger.json',
  dom_id: '#swagger-ui',
  deepLinking: true,
  presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIStandalonePreset
  ],
  plugins: [
    SwaggerUIBundle.plugins.DownloadUrl
  ],
  layout: 'StandaloneLayout',
  docExpansion: 'none',
  defaultModelsExpandDepth: -1,
  defaultModelExpandDepth: 1,
  displayRequestDuration: true,
  filter: true,
  showExtensions: true,
  showCommonExtensions: true,
  supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
  validatorUrl: null
}; 