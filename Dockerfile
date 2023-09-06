FROM node:18.16.0-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.2-alpine AS prod-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80