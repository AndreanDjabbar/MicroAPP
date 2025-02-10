# Use an official Node.js image as a base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY . .

# Build the frontend project (this assumes the "vite build" step generates the "dist" folder)
RUN npm run build

# Expose the port if needed (optional, for local testing)
EXPOSE 3000

# Set the entrypoint for the container (optional, if you want to run a dev server in Docker)
CMD ["npm", "run", "dev"]
