# Use the Debian-based slim image for better native module compatibility
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (This should now correctly install the Rolldown native binding)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the Vite development server runs on (5173)
EXPOSE 5173

# Define the command to start the client application
CMD ["npm", "run", "dev"]