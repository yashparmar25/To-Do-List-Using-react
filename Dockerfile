# Stage 1: Build the Vite application
FROM node:18 AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Clean npm cache and install dependencies reliably
RUN npm cache clean --force
RUN npm ci

# Copy source files
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve the built app using a lightweight image
FROM node:18-alpine

WORKDIR /app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 80
EXPOSE 80

# Run the app on port 80
CMD ["serve", "-s", "dist", "-l", "80"]
