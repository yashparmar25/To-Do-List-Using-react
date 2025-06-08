# Stage 1: Build the Vite application
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built application
# Using a smaller base image for the final production image
FROM node:18-alpine

WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy the built application from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Expose the port where your application will be served
# It's good practice to align this with your docker-compose.yml mapping.
# If you want to access it on 3000 on your host and 80 in container,
# then 'serve' needs to listen on 80.
EXPOSE 80

# Command to run the application using 'serve'
# -s dist: serve static files from the 'dist' directory
# -l 80: listen on port 80
CMD ["serve", "-s", "dist", "-l", "80"]