# Stage 1: Build
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema
COPY prisma prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app ./

# Expose port
EXPOSE 4002

# Run Prisma migrations and start app
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
