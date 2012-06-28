// ### EventEmitter
//
// Emits events, and can be inherited from.
//
(function(exports) {

  function EventEmitter() {
    this.listeners = {};
    return this;
  }

  EventEmitter.prototype.on = function(eventname, callback, context) {
    if ( !(eventname in this.listeners) ) {
      this.listeners[ eventname ] = [];
    }
    this.listeners[ eventname ].push({ f: callback, c: context || this });
  };

  EventEmitter.prototype.emit = function(eventname) {
    if (eventname in this.listeners) {
      var args = Array.prototype.slice.call(arguments);
      this.listeners[ eventname ].forEach(function(listener) {
        listener.f.apply( listener.c, args.slice(1) );
      }, this);
    }
  };

  exports.EventEmitter = EventEmitter;

})(window);

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
(function(exports) {

  function Request() {
    this.xhp = new XMLHttpRequest();
    var reqcontext = this;
    this.xhp.addEventListener("load", function() {
      loaded.apply(reqcontext, arguments);
    });
    this.xhp.addEventListener("error", function() {
      errored.apply(reqcontext, arguments);
    });
    return this;
  }
  // inherit from EventEmitter
  Request.prototype = new EventEmitter();
  Request.prototype.constructor = Request;
  exports.Request = Request;

  Request.prototype.get = function(url) {
    this.xhp.open('GET', url, true);
    this.xhp.send();
  };

  function loaded (ev) {
    if ( this.xhp.status.toString()[0] === '2' ) {
      var data = null;
      try {
        data = JSON.parse(this.xhp.responseText);
      } catch (err) { }
      this.emit('success', data || this.xhp.responseText, this.xhp.statusText);
    } else {
      console.log('Successful request with non-2XX status.');
      console.log(this.xhp);
    }
  }

  function errored (ev) {
    this.emit('error', this.xhp.statusText);
    console.log('Unsuccessful request.');
    console.log(this.xhp);
  }

})(window.JaxLib = {});

// ### dogjs
//
// Connects to dog servers
//
// Prereqs: To be used in *modern* browsers
//
(function(exports) {

  // dogjs is an augmented EventEmitter instance
  var dogjs = new EventEmitter();
  exports.dogjs = dogjs;

})(window);
