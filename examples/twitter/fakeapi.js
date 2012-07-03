
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

var poll, event1, tweet1;

event1 = {
  type: "event",
  timestamp: "2012-06-23T15:30:22.591Z",
  id: "VoojLPmRpeyg",
  track_id: "TyFmJoRMj1Fj",
  name: [ "tweets" ],
  input: [ 'username', 'status' ],
  output: [ ]
};

tweet1 = {
  type: "message",
  timestamp: "2012-06-25T11:10:10.591Z",
  id: "bmYiaGjNYIRJ",
  track_id: "bmSADJKLNYIRJ",
  name: [ "@each:tweets", "tweet" ],
  input: {
    username: "",
    status: ""
  }
};

poll = [ event1 ];

function duplicate(obj) {
  var dup = {}, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        dup[key] = obj[key].slice();
      } else if (obj[key] === Object(obj[key])) {
        dup[key] = duplicate(obj[key]);
      } else {
        dup[key] = obj[key];
      }
    }
  }
  return dup;
}

// poll stream

server.get('/dog/stream/poll.json', function(req, res) {
  res.send(json({
    items: poll
  }));
});

var numposts = 1;
server.post('/tweet', function (req, res) {
  var tweet = duplicate(tweet1);
  tweet.input['username'] = req.body['username'];
  tweet.input['status'] = req.body['status'];
  tweet.id += String(numposts);
  numposts++;
  poll.push(tweet);
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
