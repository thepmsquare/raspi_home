# use node.js as the base image for building gatsby
FROM node:20 AS builder

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json before installing dependencies
COPY package.json package-lock.json ./

# install dependencies
RUN npm ci

# copy the rest of the project files
COPY . .

# build the gatsby site
RUN npm run build

# use nginx as the base image for serving the built site
FROM nginx:latest

# copy the built gatsby site to nginx's html directory
COPY --from=builder /app/public /usr/share/nginx/html

# expose port 80
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
