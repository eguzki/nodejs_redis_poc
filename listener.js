'use strict';

const http = require('http');

function start(port) {
  console.log(`Worker ${process.pid} started...`);

  http.createServer((req, res) => {
    res.writeHead(200);
    res.end();
  }).listen(port);
}

module.exports.start = start;
