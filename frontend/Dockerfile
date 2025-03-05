# Use Node.js to build the frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:stable-alpine

# Copy the built frontend to the Nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
