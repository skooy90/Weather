# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install @nestjs/common @nestjs/mongoose mongoose @nestjs/platform-express @nestjs/swagger @types/multer

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production @nestjs/common @nestjs/mongoose mongoose @nestjs/platform-express @nestjs/swagger @types/multer

# Copy compiled files from builder
COPY --from=builder /app/dist ./dist

# 로그 디렉토리 생성
RUN mkdir -p /app/logs

# 업로드 디렉토리 생성
RUN mkdir -p /app/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:10000/health || exit 1

# Start the application
CMD ["node", "dist/main"] 