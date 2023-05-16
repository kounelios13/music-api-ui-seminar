# First stage: build the Angular app
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Second stage: serve the app using nginx
FROM nginx:alpine
COPY --from=builder /app/dist/music-ui/ /usr/share/nginx/html/
