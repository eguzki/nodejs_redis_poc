'use strict';

var http = require("http");
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Nodejs PoC'
});

parser.addArgument(
  [ '-p', '--port' ],
  {
    defaultValue: "3000",
    help: "Http listen port"
  }
);

var args = parser.parseArgs();

var server = http.createServer(function(request, response) {
  response.writeHead(200);
  response.end();
});

function main() {
  console.log(args);
  server.listen(parseInt(args.port));
}

//
main();

