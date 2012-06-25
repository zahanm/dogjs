
var express, server;

express = require('express');

server = express.createServer();

server.configure(function() {
  server.use(express.logger('short'));
});

server.get('/', function(req, res) {
  res.send('Hello world');
});

server.listen(process.env.PORT || 8080, function() {
  console.log('Listening');
});
