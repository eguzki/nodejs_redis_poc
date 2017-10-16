FROM node:boron

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install

# Bundle app source
COPY server.js .

ENTRYPOINT [ "npm", "start", "--"]

CMD ["-p", "3000", "--redis-port", "6379", "--redis-host", "127.0.0.1"]

