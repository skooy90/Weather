import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import productRoutes from './routes/productRoutes.js';
import productDetailRoutes from './routes/productDetailRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/contentRoutes.js';

const app = express();

// 로깅 설정
const logDir = path.join(process.cwd(), 'logs');
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

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 라우트 설정
app.use('/api/products', productRoutes);
app.use('/api/product-details', productDetailRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);

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
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/weather_app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB 연결 성공');
    })
    .catch((err) => {
        console.error('MongoDB 연결 실패:', err);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
}); 