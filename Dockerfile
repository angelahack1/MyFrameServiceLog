# Use an official Node.js runtime as the base image
FROM ubuntu:noble


RUN mkdir -p /app

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Installing sources...
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Installing nodejs
RUN apt install -y nodejs

# Installing npm
RUN apt install -y npm

# Install the application dependencies
RUN npm install

# Install libnode in order to run node-gyp addons...
RUN apt install -y libnode-dev

# Install node-gyp
RUN npm install -g node-gyp

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 443 for the application
EXPOSE 443

# Define the command to run the application
CMD [ "npm", "run", "start" ]
