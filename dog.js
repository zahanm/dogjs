// ### EventEmitter
//
// Emits events, and can be inherited from.
//
(function (exports) {
  'use strict';

  function EventEmitter() {
    this.listeners = {};
    return this;
  }

  EventEmitter.prototype.on = function (eventname, callback, context) {
    if (this.listeners[eventname] === undefined) {
      this.listeners[eventname] = [];
    }
    this.listeners[eventname].push({ f: callback, c: context || this });
  };

  EventEmitter.prototype.emit = function (eventname) {
    if (this.listeners[eventname] !== undefined) {
      var args = Array.prototype.slice.call(arguments);
      this.listeners[eventname].forEach(function (listener) {
        listener.f.apply(listener.c, args.slice(1));
      }, this);
    }
  };

  exports.EventEmitter = EventEmitter;

}(window));

// ### Request
//
// Request is a simplification of AJAX requests made through `XMLHttpRequest`
//
// Followup callbacks are set using the `.on( .. )` interface.
// Notably,
//
//     request.on('success', function() { .. })
//
// and
//
//     request.on('error', function() { .. })
//
// do what you would expect.
//
// You can make a new request with
//
//     var request = new JaxLib.Request()
//     request.on('success', ..);
//     request.get('http://jabber.wocky.org/dog/');
//
(function (exports) {
  'use strict';

  function loaded(req) {
    if (req.xhp.status.toString()[0] === '2') {
      var data = null;
      try {
        data = JSON.parse(req.xhp.responseText);
      } catch (err) { }
      req.emit('success', data || req.xhp.responseText, req.xhp.statusText);
    } else {
      console.log('Successful request with non-2XX status.');
      console.log(req.xhp);
    }
  }

  function errored(req) {
    req.emit('error', req.xhp.statusText);
    console.log('Unsuccessful request.');
    console.log(req.xhp);
  }

  function Request() {
    this.xhp = new XMLHttpRequest();
    var req = this;
    this.xhp.addEventListener("load", function () {
      loaded(req);
    });
    this.xhp.addEventListener("error", function () {
      errored(req);
    });
    return this;
  }
  // inherit from EventEmitter
  Request.prototype = new EventEmitter();
  Request.prototype.constructor = Request;
  Request.prototype.__super__ = EventEmitter.prototype;

  Request.prototype.get = function (url) {
    this.xhp.open('GET', url, true);
    this.xhp.send();
  };

  // make Request public
  exports.Request = Request;

}(window));

// ### dogjs
//
// Connects to dog servers
//
// Prereqs: To be used in *modern* browsers
//
(function (exports) {
  'use strict';

  // `dogjs` is an augmented EventEmitter instance
  var dogjs = new EventEmitter();
  exports.dogjs = dogjs;

}(window));
