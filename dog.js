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
//     var request = new JaxLib.Request('http://jabber.wocky.org/dog/')
//
(function(exports) {

  var Request;

  Request = function(url) {
    this.url = url;
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

  Request.prototype.get = function() {
    this.xhp.open('GET', this.url, true);
  };

  Request.prototype.on = function(target, callback) {
    if (!target in this.listeners) {
      this.listeners[ target ] = [];
    }
    this.listeners[ target ].push(callback);
  };

  function loaded (ev) {
    if ( this.xhp.status.toString()[0] === '2' ) {
      
    } else {
      console.log('Successful request with non-2XX status.');
      console.log(this.xhp);
    }
  }

  function errored (ev) {
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

  

})(window.dogjs = {});
