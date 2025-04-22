require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const productRoutes = require('./routes/productRoutes');
const productDetailRoutes = require('./routes/productDetailRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 로깅 설정
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms', {
    stream: accessLogStream
}));

// 보안 미들웨어
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://weather-backend-knii.onrender.com"],
        },
    },
    referrerPolicy: { policy: 'same-origin' },
    crossOriginEmbedderPolicy: false
}));

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://weather-of7u.onrender.com',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 요청 제한 설정
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 100, // IP당 최대 요청 수
    message: {
        success: false,
        message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
    }
});
app.use(limiter);

// JSON 파싱
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Swagger 설정
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Weather API',
            version: '1.0.0',
            description: '날씨 정보 API 문서'
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' 
                    ? 'https://weather-backend-knii.onrender.com'
                    : 'http://localhost:8000',
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Weather API Documentation",
    customfavIcon: "/favicon.ico"
}));

// Swagger JSON 엔드포인트
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// 라우트 설정
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', productRoutes);
app.use('/api/product-details', productDetailRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

// 404 에러 처리
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '요청하신 리소스를 찾을 수 없습니다.'
    });
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // 운영 환경별 에러 메시지 처리
    const error = process.env.NODE_ENV === 'development' 
        ? { message: err.message, stack: err.stack }
        : { message: '서버 에러가 발생했습니다.' };

    res.status(err.status || 500).json({
        success: false,
        ...error
    });
});

// MongoDB 연결
const connectWithRetry = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
    })
    .then(() => {
        console.log('MongoDB 연결 성공');
        // 서버 시작
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
        });
    })
    .catch(err => {
        console.error('MongoDB 연결 실패:', err);
        console.log('5초 후 재연결 시도...');
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry(); 