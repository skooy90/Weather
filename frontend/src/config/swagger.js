// Swagger UI 설정
export const SWAGGER_CONFIG = {
  dom_id: '#swagger-ui',
  deepLinking: true,
  presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIStandalonePreset
  ],
  plugins: [
    SwaggerUIBundle.plugins.DownloadUrl
  ],
  layout: "BaseLayout",
  docExpansion: 'list',
  defaultModelsExpandDepth: 1,
  defaultModelExpandDepth: 1,
  defaultModelRendering: 'model',
  displayRequestDuration: true,
  filter: true,
  operationsSorter: 'alpha',
  showExtensions: true,
  showCommonExtensions: true,
  tagsSorter: 'alpha',
  validatorUrl: null,
  persistAuthorization: true,
}; 