FROM node:14.16.0
 
LABEL version="1.0"
LABEL description="This is the base docker image for frontend react app odmanagement."
LABEL maintainer = ["sandhyasankar29@gmail.com"]
 
WORKDIR /ODMLMANAGEMENTFRONTEND
 
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .
 
EXPOSE 3000
 
CMD ["npm", "start"]