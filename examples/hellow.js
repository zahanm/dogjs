
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

// ### Dog code to generate these API responses
//
// rate_image = task {
//   input path
//   output rating
//   output inappropriate
//   output keywords
// }
//
// label_image = task {
//   input path
//   output label
//   output keywords
// }
//
// say_hello = task {
//   input name
//   output greeting
// }
//
// welcome = message {
//   title: "Welcome!",
//   body: "This is a warm hello to you."
// }
//
// alert = message {
//   title: "Oh no!",
//   body: "Something very scary just happened!"
// }
//
// image_path = "/images/image1.png"
//
// NOTIFY PEOPLE FROM mit OF welcome
//
// response = ASK PEOPLE FROM mit TO rate_image ON image_path
// rating = response.rating
//
// response = ASK PEOPLE FROM mit TO label_image ON image_path
// label = response.label
//
// LISTEN TO PUBLIC VIA http AT "/hello" FOR hello_request
// ON hello_request DO
//   my_name = "Zahan"
//   requester = PERSON FROM hello_request
//   response = ASK requester TO say_hello ON my_name
//   greeting = response.greeting
//   NOTIFY requester OF alert
// END
//
// ---

var task1, task2, task3, msg1, msg2, track1, track2;

track1 = {
  type: "track",
  timestamp: "2012-06-22T16:25:16.591Z",
  id: "TyFmJoRMj1Fj"
  // ..
};

track2 = {
  type: "track",
  timestamp: "2012-06-22T16:25:16.591Z",
  id: "4miff6SQ9av1"
  // ..
};

task1 = {
  type: "task",
  timestamp: "2012-06-22T16:25:16.591Z",
  id: "noNP1ZRboya5",
  track_id: track1.id,
  name: [
    "rate_image"
  ],
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
  name: [
    "label_image"
  ],
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
  name: [ "@on:hello_request", "say_hello" ],
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
  name: [ "@on:hello_request", "alert" ],
  input: {
    title: "Oh no!",
    body: "Something very scary just happened!"
  }
};

server.get('/dog/stream/tasks.json', function(req, res) {
  res.send(json({
    items: [ task1, task2, task3 ]
  }));
});

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
