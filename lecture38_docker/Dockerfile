
# we are using nodejs(v 22) as base image (its a basic source to run application)
FROM node:22

# we are creationg a directory just like mkdir app
WORKDIR /app

# copying the files (package.json and package-lock.json) to current directory(/app)
COPY package*.json .

# installing the dependency (create a node_modules folder)
RUN npm install

# copying all the files and folder to app directory
COPY . .

# PROVIDING ENV VARIABLES
ENV PORT=4000

# PORT EXPOSE SO THAT SYSTEM CAN SEND REQ TO DOCKER SO THAT IT CAN GIVE RES
EXPOSE 4000

# to run code we have to pass the start command  in cmd
CMD [ "npm","start" ]