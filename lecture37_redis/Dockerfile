
#use node v22 as our base image
FROM node:22

# WE HAVE TO SWITH TO THE WORK DIRECTORY 
WORKDIR /app

# copy the package .json to install all the packages
COPY package*.json ./

# download the packages ->this will download the node_modules
RUN npm install

# IT WILL COPY ALL THE FILES WHICH MEANY IT COPY NODE_MODULES AGAIN - TO SAVE THIS WE WILL WRITE .DOCKERIGNORE
COPY . .

# set env
ENV PORT=4000

# EXPOSE THE PORT
EXPOSE 4000

# RUN THE CODE
CMD [ "npm","start" ]