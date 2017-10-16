'use strict';

var http = require("http");
var redis = require("redis")
var ArgumentParser = require("argparse").ArgumentParser;

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Nodejs Redis PoC'
});

parser.addArgument(
  [ '-p', '--port' ],
  {
    defaultValue: "3000",
    help: "Http listen port"
  }
);

parser.addArgument(
  '--redis-port' ,
  {
    defaultValue: "6379",
    help: "Redis listen port"
  }
);

parser.addArgument(
  '--redis-host' ,
  {
    defaultValue: "127.0.0.1",
    help: "Redis listen host"
  }
);

var args = parser.parseArgs();

var redisClient = redis.createClient(args.redis_port, args.redis_host);

var server = http.createServer(function(request, response) {
  redisClient.set("mykey", 3, function(err, redis_resp) {
    redisClient.get("mykey", function(err, val) {
      response.writeHead(200);
      response.end();
    });
  });
});

function main() {
  console.log(args);
  server.listen(parseInt(args.port));
}

//
main();

