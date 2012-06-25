
var express, server, port;

express = require('express');

server = express.createServer();

server.configure(function() {
  server.use(express.logger('short'));
  server.use(jsonType);
  server.use(server.router);
});

server.get('/', function(req, res) {
  res.send(json('Hello world'));
});

port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('Listening on', port);
});

// Helpers

function jsonType (req, res, next) {
  res.contentType('application/json');
  next();
}

function json (o) {
  if (typeof o === 'string') {
    o = { 'msg': o };
  }
  return JSON.stringify(o);
}
