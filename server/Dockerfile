# Use a secure and stable Node.js base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
# This step is crucial for dependency caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# The default port your server listens on (defined in server.js/config.env)
EXPOSE 5050

# Define the command to start the server
# Your server.js script must be in the root of the WORKDIR
CMD [ "node", "server.js" ]