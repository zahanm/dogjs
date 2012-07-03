// Prereqs: To be used in *modern* browsers
//
// ### HTML Structure
// Each Dog structure has a matching HTML implementation
//
// These templates are kept together in a section for dog
// templates only, the `<dog> .. </dog>` tag.
// Convention places this section at the top of your HTML
// file.
//
// #### notification
//
//     <section notify="notification_name" target="selector">
//       {{ title }} .. {{ body }}
//     </section>
//
// #### task
//
//     <form task="task_name" target="selector">
//       <input type="text" name="input_name">
//     </form>
//
// #### listen
//
//     <form listen="listen_name" target="selector">
//       <input type="text" name="input_name">
//     </form>
//
// ### Events
// You register listeners for events that can execute arbitrary javascript
// with the contents of a message, for instance
//
//     dogjs.on('message', function (data) {
//       console.log( data['title'], data['body'] );
//     });
//
(function (exports) {

  exports.last = function (arrlike) {
    return arrlike[arrlike.length - 1];
  }

}(window.Utilities = {}));


// ## EventEmitter
//
// Emits events, and can be inherited from.
//
(function (exports) {
  'use strict';

  function EventEmitter() {
    this.listeners = {};
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

// ## Request
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

  function toqs(data) {
    var key, qsarr = [];
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        qsarr.push( encodeURIComponent(key) + '=' + encodeURIComponent(String(data[key])) );
      }
    }
    return qsarr.join('&');
  }

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
    // Call parent constructor
    this.__super__.constructor.call(this);
    this.xhp = new XMLHttpRequest();
    var req = this;
    this.xhp.addEventListener("load", function () {
      loaded(req);
    });
    this.xhp.addEventListener("error", function () {
      errored(req);
    });
  }
  // inherit from EventEmitter
  Request.prototype = new EventEmitter();
  Request.prototype.constructor = Request;
  Request.prototype.__super__ = EventEmitter.prototype;

  Request.prototype.get = function (url, data) {
    url += '?' + toqs(data);
    this.xhp.open('GET', url, true);
    this.xhp.send();
  };

  // make Request public
  exports.Request = Request;

}(window));

// ## dogjs
//
// Connects to dog servers
//
(function (exports) {
  'use strict';

  // `dogjs` is an augmented EventEmitter instance
  var dogjs = new EventEmitter();

  function onpoll(data) {
    console.log(repeats);
    data['items'].forEach(function (item) {
      if (item.name.length) {
        switch(item.type) {
          case 'task':
            if (Utilities.last(item.name) in tasks) {
              // XXX TODO
            } else {
              console.error('No task template for item', item);
              return;
            }
            break;
          case 'event':
            if (Utilities.last(item.name) in listens) {
              // XXX TODO
            } else {
              console.error('No listen template for item', item);
              return;
            }
            break;
          case 'message':
            if (Utilities.last(item.name) in notifys) {
              // XXX TODO
            } else {
              console.error('No notify template for item', item);
              return;
            }
            break;
          default:
        }
      } else {
        console.error('No name for item', item);
        return;
      }
    });
    // repoll in 2 seconds
    setTimeout(repoll, 2000);
  }

  var repeats = 0; // DEBUG
  function repoll() {
    repeats++; // DEBUG
    if (repeats > 5) { return; } // DEBUG
    var poll = new Request();
    dogjs.lastpolled = new Date();
    poll.on('success', onpoll);
    poll.get('/dog/stream/poll.json', { 'after': dogjs.lastpolled.toISOString() });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var elems, dogblock;
    elems = document.getElementsByTagName('dog');
    if (!elems.length) {
      console.error('Missing <dog> .. </dog> templates section');
      console.error('Aborting');
      return;
    }
    dogblock = elems[0];
    dogblock.style.display = 'none';

    dogjs.tasks = {};
    dogjs.oneachs = {};
    dogjs.listens = {};
    dogjs.notifys = { 'test': 123 };
    elems = dogblock.getElementsByTagName('form');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['task']) {
        dogjs.tasks[ elem.attributes['task'].value ] = elem;
      } else if (elem.attributes['listen']) {
        dogjs.listens[ elem.attributes['listen'].value ] = elem;
      }
    });
    elems = dogblock.getElementsByTagName('section');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['notify']) {
        dogjs.notifys[ elem.attributes['notify'].value ] = elem;
      } else if (elem.attributes['oneach']) {
        dogjs.oneachs[ elem.attributes['oneach'].value ] = elem;
      }
    });

    repoll();
  }, false);

  exports.dogjs = dogjs;

}(window));
