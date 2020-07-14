FROM node:11.1.0-alpine as build

WORKDIR /app

COPY package*.json /app/

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY ./ /app/

RUN npm run build


# set up production environment
# the base image for this is an alpine based nginx image
FROM nginx:1.15.8-alpine
# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx/nginx.conf /etc/nginx/conf.d
# --------- /only for those using react router ----------
# expose port 80 to the outer world
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]