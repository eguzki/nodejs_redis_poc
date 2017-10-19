'use strict';

const cluster = require('cluster');
var ArgumentParser = require("argparse").ArgumentParser;
const DefaultNumCPUs = require('os').cpus().length;
var listener = require('./listener.js')

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

parser.addArgument(
  [ '-w', '--workers' ],
  {
    defaultValue: DefaultNumCPUs,
    help: "Http listen port"
  }
);

var args = parser.parseArgs();

function childProcess() {
	listener.start(parseInt(args.port));
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < args.workers; i++) {
    cluster.fork();
  }
}

function main() {
	if (cluster.isMaster) {
  	console.log(args);
		masterProcess();
	} else {
		childProcess();
	}
}

//
main();

