# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install dependencies 
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Build your NestJS application for production
RUN npm run build

# Expose the port your application will run on
EXPOSE 3000

# Start your application in production mode
CMD ["npm", "run", "start:prod"]
