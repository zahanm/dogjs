
var express, server, port;

path = require('path');
express = require('express');

server = express.createServer();

server.configure(function() {
  server.use(express.logger('short'));
  server.use(express.bodyParser());
  server.use(jsonType);
  server.use(server.router);
});

server.get('/', function(req, res) {
  res.contentType('text/html');
  res.sendfile( path.resolve( __dirname, 'index.html' ) );
});

server.get('/dog.js', function(req, res) {
  res.contentType('text/javascript');
  res.sendfile( path.resolve( __dirname, '../../dog.js' ) );
});

// Dog API section

var poll = [], event1;

event1 = {
  type: "event",
  timestamp: "2012-06-23T15:30:22.591Z",
  id: "VoojLPmRpeyg",
  track_id: "TyFmJoRMj1Fj",
  name: [ "tweets" ],
  input: [ ],
  output: [ ]
};

// poll stream

server.get('/dog/stream/poll.json', function(req, res) {
  console.info('after', req.query['after']);
  res.send(json({
    items: poll
  }));
});

server.post('/tweet', function (req, res) {
  poll.push({
    username: req.body['username'],
    status: req.body['status']
  });
  res.send(json({
    success: true
  }));
});

// catch all

server.get('/*', function(req, res) {
  res.send(json({
    success: false,
    errors: [ "Unrecognized path" ]
  }));
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
