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

  var Request;

  Request = function() {
    this.listeners = {};
    this.xhp = new XMLHttpRequest();
    var reqcontext = this;
    this.xhp.addEventListener("load", function() {
      loaded.apply(reqcontext, arguments);
    });
    this.xhp.addEventListener("error", function() {
      errored.apply(reqcontext, arguments);
    });
    return this;
  };
  exports.Request = Request;

  Request.prototype.get = function(url) {
    this.xhp.open('GET', url, true);
    this.xhp.send();
  };

  Request.prototype.on = function(eventname, callback, context) {
    if ( !(eventname in this.listeners) ) {
      this.listeners[ eventname ] = [];
    }
    this.listeners[ eventname ].push({ f: callback, c: context || this });
  };

  function loaded (ev) {
    if ( this.xhp.status.toString()[0] === '2' ) {
      if ('success' in this.listeners) {
        var data = null;
        try {
          data = JSON.parse(this.xhp.responseText);
        } catch (err) { }
        this.listeners['success'].forEach(function(listener) {
          listener.f.call(listener.c, data || this.xhp.responseText, this.xhp.statusText);
        }, this);
      }
    } else {
      console.log('Successful request with non-2XX status.');
      console.log(this.xhp);
    }
  }

  function errored (ev) {
    if ('error' in this.listeners) {
      this.listeners['error'].forEach(function(listener) {
        listener.f.call(listener.c, this.xhp.statusText);
      }, this);
    }
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

  document.addEventListener('DOMContentLoaded', function() {
    var request = new JaxLib.Request();
    request.on('success', function(data) {
      console.log( data['msg'] );
    });
    request.get('http://localhost:8080/helloworld');
  }, false);

})(window.dogjs = {});
