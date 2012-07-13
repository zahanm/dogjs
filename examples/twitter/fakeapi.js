
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
  res.sendfile( path.resolve( __dirname, 'views/index.html' ) );
});

server.get('/dog.js', function(req, res) {
  res.contentType('text/javascript');
  res.sendfile( path.resolve( __dirname, 'views/dog.js' ) );
});

// Dog API section

var listen, template_tweet;

listen = {
  type: "listen",
  timestamp: "2012-06-23T15:30:22.591Z",
  id: "VoojLPmRpeyg",
  name: [ "tweets" ],
  properties: [
    {
      identifier: 'username',
      direction: 'input',
      required: true
    },
    {
      identifier: 'status',
      direction: 'input',
      required: true
    }
  ]
};

template_tweet = {
  type: "notify",
  timestamp: "2012-06-25T11:10:10.591Z",
  id: "bmYiaGjNYIRJ",
  name: [ "oneach:tweets", "tweet" ],
  properties: []
};

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

function toArray(obj) {
  var key, arr = [];
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(obj[key]);
    }
  }
  return arr;
}

// poll stream
//
// each tweet: {
//   id: 'sadasdasdfa'
//   properties: [
//   {
//     identifier: 'username',
//     value: 'zahanm',
//     direction: 'input'
//   },
//   ...
//   ]
// }

var rootstream = [ listen ];
var listenstream = []
var tweettracks = {};

server.get('/dog/stream', function(req, res) {
  res.send(json({
    self: null,
    items: rootstream
  }));
});

server.get('/dog/stream/:oid', function (req, res) {
  // console.log('GET listen id:', req.params['oid']);
  if (req.params['oid'] == listen.id) {
    res.send(json({
      self: listen,
      items: listenstream
    }));
  } else if (req.params['oid'] in tweettracks) {
    res.send(json({
      self: tweettracks[ req.params['oid'] ],
      items: null
    }));
  } else {
    res.send(json({
      success: false
    }));
  }
});

var numposts = 1;
server.post('/dog/stream/:oid', function (req, res) {
  console.log('POST listen id:', req.params['oid']);
  var tweet = duplicate(template_tweet);
  tweet.properties = [];
  tweet.properties.push({
    identifier: 'username',
    value: req.body['username'],
    direction: 'output'
  });
  tweet.properties.push({
    identifier: 'status',
    value: req.body['status'],
    direction: 'output'
  });
  tweet.id += String(numposts);
  numposts++;
  var track = {
    self: {
      id: 'track:' + tweet.id,
      type: 'track',
      name: []
    },
    items: [ tweet ]
  };
  tweettracks[ track.id ] = track;
  listenstream.push(track['self']);
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
