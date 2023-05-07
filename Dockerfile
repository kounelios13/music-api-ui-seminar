# First stage: build the Angular app
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Second stage: serve the app using nginx
FROM nginx:1.19-alpine
COPY --from=builder /app/dist/music-ui/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
