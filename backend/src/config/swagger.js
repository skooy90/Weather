const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: '날씨 정보 및 쇼핑몰 API 문서',
      contact: {
        name: 'API Support',
        email: 'support@kysong.store'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.kysong.store'
          : 'http://localhost:8000',
        description: process.env.NODE_ENV === 'production' ? '프로덕션 서버' : '개발 서버'
      }
    ],
    tags: [
      { name: 'Products', description: '제품 관련 API' },
      { name: 'Cart', description: '장바구니 관련 API' },
      { name: 'Users', description: '사용자 관리 API' },
      { name: 'Weather', description: '날씨 정보 API' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        UnauthorizedError: {
          description: '인증 오류',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: '인증이 필요합니다.'
                  }
                }
              }
            }
          }
        },
        BadRequestError: {
          description: '잘못된 요청',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: '잘못된 요청입니다.'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
}; 