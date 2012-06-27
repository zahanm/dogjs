
var express, server, port;

path = require('path');
express = require('express');

server = express.createServer();

server.configure(function() {
  server.use(express.logger('short'));
  server.use(jsonType);
  server.use(server.router);
});

server.get('/', function(req, res) {
  res.contentType('text/html');
  res.sendfile( path.resolve( __dirname, 'index.html' ) );
});

server.get('/dog.js', function(req, res) {
  res.contentType('text/javascript');
  res.sendfile( path.resolve( __dirname, '../dog.js' ) );
});

server.get('/helloworld', function(req, res) {
  res.send(json('Hello world'));
});

// Dog API section

var event1, task1, task2, task3, msg1, msg2, track1, track2, tasks, msgs, tracks;

event1 = {
  type: "event",
  timestamp: "2012-06-23T15:30:22.591Z",
  id: "VoojLPmRpeyg",
  track_id: "TyFmJoRMj1Fj",
  name: [ "hello_request" ],
  input: [ ],
  output: [ ]
};

track1 = {
  type: "track",
  timestamp: "2012-06-22T16:25:16.591Z",
  id: "TyFmJoRMj1Fj",
  name: [ "@root" ],
  variables: {},
  trace: [ ],
  tracks: [ "4miff6SQ9av1" ],
  tasks: [ task1 ],
  messages: [ msg1 ],
  events: [ ]
};

track2 = {
  type: "track",
  timestamp: "2012-06-21T11:35:46.591Z",
  id: "4miff6SQ9av1",
  name: [ "@each:hello_request" ],
  variables: {
    "my_name": "Zahan"
  },
  trace: [ track1.id ],
  tracks: [ ],
  tasks: [ task3 ],
  messages: [ msg1, msg2 ],
  events: [ event1 ]
};

task1 = {
  type: "task",
  timestamp: "2012-06-22T16:25:16.591Z",
  id: "noNP1ZRboya5",
  track_id: track1.id,
  name: [ "rate_image" ],
  input: {
    path: "/images/image1.png"
  },
  output: [
    "rating",
    "inappropriate",
    "keywords"
  ]
};

task2 = {
  type: "task",
  timestamp: "2012-06-20T16:45:56.591Z",
  id: "q5C1ebSKmmtS",
  track_id: track2.id,
  name: [ "label_image" ],
  input: {
    path: "/images/image1.png"
  },
  output: [
    "label",
    "keywords"
  ]
};

task3 = {
  type: "task",
  timestamp: "2012-06-10T21:05:16.091Z",
  id: "VwLVpfwksVD6",
  track_id: track1.id,
  name: [ "@each:hello_request", "say_hello" ],
  input: {
    name: "Zahan"
  },
  output: [
    "greeting"
  ]
};

msg1 = {
  type: "message",
  timestamp: "2012-06-25T11:10:10.591Z",
  id: "bmYiaGjNYIRJ",
  track_id: track1.id,
  name: [ "welcome" ],
  input: {
    title: "Welcome!",
    body: "This is a warm hello to you."
  }
};

msg2 = {
  type: "message",
  timestamp: "2012-06-23T15:30:22.591Z",
  id: "GbI4FKpTqgvJ",
  track_id: track2.id,
  name: [ "@each:hello_request", "alert" ],
  input: {
    title: "Oh no!",
    body: "Something very scary just happened!"
  }
};

tasks = {};
tasks[ task1.id ] = task1;
tasks[ task2.id ] = task2;
tasks[ task3.id ] = task3;

msgs = {};
msgs[ msg1.id ] = msg1;
msgs[ msg2.id ] = msg2;

tracks = {};
tracks[ track1.id ] = track1;
tracks[ track2.id ] = track2;

// tasks

server.get('/dog/stream/tasks.json', function(req, res) {
  res.send(json({
    items: Object.keys(tasks).map(function(oid) { return tasks[oid]; })
  }));
});

server.get('/dog/stream/tasks/:oid.json', function(req, res, next) {
  if (!req.params.oid in tasks) { next(); return; }
  res.send(json( tasks[ req.params.oid ] ));
});

// messages

server.get('/dog/stream/messages.json', function(req, res, next) {
  res.send(json({
    items: Object.keys(msgs).map(function(oid) { return msgs[oid]; })
  }));
});

server.get('/dog/stream/messages/:oid.json', function(req, res, next) {
  if (!req.params.oid in msgs) { next(); return; }
  res.send(json( msgs[ req.params.oid ] ));
});

// tracks

server.get('/dog/stream/tracks.json', function(req, res, next) {
  res.send(json({
    items: Object.keys(tracks).map(function(oid) { return tracks[oid]; })
  }));
});

server.get('/dog/stream/tracks/:oid.json', function(req, res, next) {
  if (!req.params.oid in tracks) { next(); return; }
  res.send(json( tracks[ req.params.oid ] ));
});

server.get('/dog/stream/tracks/root.json', function(req, res, next) {
  res.send(json( track1 ));
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
