// ### HTML Structure
// Each Dog structure has a matching HTML implementation
//
// These templates are kept together in a section for dog
// templates only, the `<dog> .. </dog>` tag.
// Convention places this section at the top of your HTML
// file.
//
// #### notify
//
//     <section notify="notification_name" holder="selector">
//       {{ title }} .. {{ body }}
//     </section>
//
// #### ask
//
//     <form ask="task_name" holder="selector">
//       <input type="text" name="input_name">
//     </form>
//
// #### listen
//
//     <form listen="listen_name" holder="selector">
//       <input type="text" name="input_name">
//     </form>
//
// #### oneach
//
//     <section oneach="oneach_name" subscribe="true">
//       .. notify, ask and listen tags ..
//     </section>
//
// ### Tracks
// Tracks are instances of an event submitted to Dog.
// For example, the submission to an `ASK` or a `LISTEN` is instantiated as a `track` on the
// stream.
//
// You access `track`s by subscribing to the stream of the `ON EACH` that it corresponds to.
// That is the function of the `subscribe` attribute in the `oneach` tag.
//
// ### Events
// You register listeners for events that can execute arbitrary javascript
// with the contents of a message, for instance
//
//     dogjs.on('message', function (data) {
//       console.log( data['title'], data['body'] );
//     });
//
// ### Target
// The `holder` attribute in the source node is used to specify what the
// holder node should be.
// Usually, takes the form of a CSS selector, that should specify single DOM node.
//
//     <form listen=".." holder="#tweetbox">
//       ..
//     </form>
//
// Can also be the special value `dialog`, which targets a modal dialog that is
// created for this element.
//
// ### Method
// The `method` attribute in the holder node is used to specify
// how the node is updated
//
// #### append
// Append a new child of the holder node
//
// #### prepend
// Add a new child at the beginning of the holder node
//
// #### enqueue
// Maintain queue for node, when current node clears
//
// #### overwrite
// Always overwrite holder node
//
// #### update
// Same as overwrite, except only triggered when it's the same object
//
// #### fill
// Currently called `replace`, only fill in if holder node is empty
//
// ### Browser Requirements
// HTML5 compatibilty
//
// - `element.addEventListener( .. )`
// - `fd = new FormData(form)`
//

// ## Mustache.js (minified)
//
// mustache.js - Logic-less `{{mustache}}` templates with JavaScript
// Taken from [https://github.com/janl/mustache.js](https://github.com/janl/mustache.js)
//
(function(a){function h(a,b){return RegExp.prototype.test.call(a,b)}function i(a){return!h(d,a)}function l(a){var b=a.replace(k,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)});return'"'+b+'"'}function m(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}function o(a){return String(a).replace(/[&<>"'\/]/g,function(a){return n[a]})}function p(a){this.string=a,this.tail=a,this.pos=0}function q(a,b){this.view=a,this.parent=b,this.clearCache()}function r(){this.clearCache()}function s(a,b){typeof a=="string"&&(a=w(a));var c=['""'],d,e,f;for(var g=0,h=a.length;g<h;++g){d=a[g];switch(d.type){case"#":case"^":e=d.type==="#"?"_section":"_inverted",c.push("r."+e+"("+l(d.value)+", c, function (c, r) {\n"+"  "+s(d.tokens,!0)+"\n"+"})");break;case"{":case"&":case"name":f=d.type==="name"?"true":"false",c.push("r._name("+l(d.value)+", c, "+f+")");break;case">":c.push("r._partial("+l(d.value)+", c)");break;case"text":c.push(l(d.value))}}return c="return "+c.join(" + ")+";",b?c:new Function("c, r",c)}function t(a){if(a.length===2)return[new RegExp(m(a[0])+"\\s*"),new RegExp("\\s*"+m(a[1]))];throw new Error("Invalid tags: "+a.join(" "))}function u(a){var b=[],c=b,d=[],e,f;for(var g=0;g<a.length;++g){e=a[g];switch(e.type){case"#":case"^":e.tokens=[],d.push(e),c.push(e),c=e.tokens;break;case"/":if(d.length===0)throw new Error("Unopened section: "+e.value);f=d.pop();if(f.value!==e.value)throw new Error("Unclosed section: "+f.value);d.length>0?c=d[d.length-1].tokens:c=b;break;default:c.push(e)}}f=d.pop();if(f)throw new Error("Unclosed section: "+f.value);return b}function v(a){var b;for(var c=0;c<a.length;++c){var d=a[c];b&&b.type==="text"&&d.type==="text"?(b.value+=d.value,a.splice(c--,1)):b=d}}function w(d,h){h=h||a.tags;var j=t(h),k=new p(d),l=[],n=[],o=!1,q=!1,r=function(){if(o&&!q)while(n.length)l.splice(n.pop(),1);else n=[];o=!1,q=!1},s,w,x;while(!k.eos()){w=k.scanUntil(j[0]);if(w)for(var y=0,z=w.length;y<z;++y)x=w[y],i(x)?n.push(l.length):q=!0,l.push({type:"text",value:x}),x==="\n"&&r();if(!k.scan(j[0]))break;o=!0,s=k.scan(g)||"name",k.scan(b);if(s==="=")w=k.scanUntil(e),k.scan(e),k.scanUntil(j[1]);else if(s==="{"){var A=new RegExp("\\s*"+m("}"+h[1]));w=k.scanUntil(A),k.scan(f),k.scanUntil(j[1])}else w=k.scanUntil(j[1]);if(!k.scan(j[1]))throw new Error("Unclosed tag at "+k.pos);l.push({type:s,value:w});if(s==="name"||s==="{"||s==="&")q=!0;s==="="&&(h=w.split(c),j=t(h))}return v(l),u(l)}function y(){x.clearCache()}function z(a,b){return x.compile(a,b)}function A(a,b,c){return x.compilePartial(a,b,c)}function B(a,b,c){if(c)for(var d in c)A(d,c[d]);return x.render(a,b)}a.name="mustache.js",a.version="0.5.1-dev",a.tags=["{{","}}"],a.parse=w,a.clearCache=y,a.compile=z,a.compilePartial=A,a.render=B,a.Scanner=p,a.Context=q,a.Renderer=r,a.to_html=function(a,b,c,d){var e=B(a,b,c);if(typeof d!="function")return e;d(e)};var b=/\s*/,c=/\s+/,d=/\S/,e=/\s*=/,f=/\s*\}/,g=/#|\^|\/|>|\{|&|=|!/,j=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},k=/[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm,n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"};a.isWhitespace=i,a.isArray=j,a.quote=l,a.escapeRe=m,a.escapeHtml=o,p.prototype.eos=function(){return this.tail===""},p.prototype.scan=function(a){var b=this.tail.match(a);return b&&b.index===0?(this.tail=this.tail.substring(b[0].length),this.pos+=b[0].length,b[0]):null},p.prototype.scanUntil=function(a){var b,c=this.tail.search(a);switch(c){case-1:b=this.tail,this.pos+=this.tail.length,this.tail="";break;case 0:b=null;break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c),this.pos+=c}return b},q.make=function(a){return a instanceof q?a:new q(a)},q.prototype.clearCache=function(){this._cache={}},q.prototype.push=function(a){return new q(a,this)},q.prototype.lookup=function(a){var b=this._cache[a];if(!b){if(a===".")b=this.view;else{var c=this;while(c){if(a.indexOf(".")>0){var d=a.split("."),e=0;b=c.view;while(b&&e<d.length)b=b[d[e++]]}else b=c.view[a];if(b!=null)break;c=c.parent}}this._cache[a]=b}return typeof b=="function"&&(b=b.call(this.view)),b},r.prototype.clearCache=function(){this._cache={},this._partialCache={}},r.prototype.compile=function(a,b){var c=s(a),d=this;return function(a){return c(q.make(a),d)}},r.prototype.compilePartial=function(a,b,c){return this._partialCache[a]=this.compile(b,c),this._partialCache[a]},r.prototype.render=function(a,b){var c=this._cache[a];return c||(c=this.compile(a),this._cache[a]=c),c(b)},r.prototype._section=function(a,b,c){var d=b.lookup(a);switch(typeof d){case"object":if(j(d)){var e="";for(var f=0,g=d.length;f<g;++f)e+=c(b.push(d[f]),this);return e}return c(b.push(d),this);case"function":var h=c(b,this),i=this,k=function(a){return i.render(a,b)};return d.call(b.view,h,k)||"";default:if(d)return c(b,this)}return""},r.prototype._inverted=function(a,b,c){var d=b.lookup(a);return d==null||d===!1||j(d)&&d.length===0?c(b,this):""},r.prototype._partial=function(a,b){var c=this._partialCache[a];return c?c(b,this):""},r.prototype._name=function(a,b,c){var d=b.lookup(a);typeof d=="function"&&(d=d.call(b.view));var e=d==null?"":String(d);return c?o(e):e};var x=new r})(window.Mustache={});

// ## Utilities
//
// Miscellaneous utility functions
//
(function (exports) {
  'use strict';

  // ### Strings

  exports.trim = function (strlike) {
    return strlike.replace(/^\s+|\s+$/g, '');
  };

  // ### Arrays

  // Delegates to native `Array.isArray(..)` when present
  function isArray(arrlike) {
    if (Array.isArray) { return Array.isArray(arrlike); }
    return Object.prototype.toString.call(arrlike) === '[object Array]';
  }
  exports.isArray = isArray;

  // ### Collections

  exports.last = function (arrlike) {
    if ( arrlike.length ) {
      return arrlike[arrlike.length - 1];
    } else {
      return arrlike;
    }
  };

  exports.isEmpty = function (objlike) {
    var key;
    for (key in objlike) {
      if (objlike.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  };

  // iterator format => `function (value, key, i) { .. }`
  exports.forEach = function (objlike, iterator) {
    var key, i = 0;
    for (key in objlike) {
      if (objlike.hasOwnProperty(key)) {
        iterator(objlike[key], key, i);
        i++;
      }
    }
  };

  // ### Contract-style programming
  //
  // Adding `.assert( .. )` allows for contract-style programming
  // that can be extrememly powerful.
  //
  // `AssertionError` is thrown when an `.assert( .. )` fails, along
  // with the failure message specified.
  function AssertionError(msg) {
    this.__super__.constructor.call(this);
    this.msg = msg;
  }
  AssertionError.prototype = new Error();
  AssertionError.prototype.constructor = AssertionError;
  AssertionError.prototype.__super__ = Error.prototype;

  AssertionError.prototype.toString = function() {
    return 'AssertionError: ' + this.msg;
  };

  exports.assert = function (exp, msg) {
    if (!exp) {
      throw new AssertionError(msg);
    }
  };

  // Send form contents over AJAX.
  // Intercepts the `submit` event, and makes the submission manually.
  exports.ajaxify = function (form) {
    form.addEventListener('submit', function (ev) {
      Utilities.assert(!ev.defaultPrevented, 'Form submit was canceled by another party');
      if (form.checkValidity) {
        Utilities.assert(form.checkValidity(), 'Form inputs invalid');
      }
      ev.preventDefault();
      var req = new Request();
      req.on('success', function (data) {
        console.log(data);
        // TODO Utilities.assert(data['success']);
      });
      req.post(form.action, new FormData(form));
      form.reset();
    });
  };

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
//     var request = new Request()
//     request.on('success', ..);
//     request.get('http://jabber.wocky.org/dog/', { query: .. });
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
    url += Utilities.isEmpty(data) ? '' : '?' + toqs(data);
    this.xhp.open('GET', url, true);
    this.xhp.send();
  };

  Request.prototype.post = function (url, data, body) {
    if (!body) { body = data; data = null; }
    url += Utilities.isEmpty(data) ? '' : '?' + toqs(data);
    this.xhp.open('POST', url, true);
    this.xhp.send(body);
  };

  // make Request public
  exports.Request = Request;

}(window));

// Subscribers
(function (exports) {
  'use strict';

  var Poller, pollinterval, pollcount;

  Poller = function (endpoint, interval, totalcount) {
    this.__super__.constructor.call(this);
    this.endpoint = endpoint;
    this.interval = interval;
    this.totalcount = totalcount || 1000;
    this.lastpolled = null;
    this.count = 0;
  };

  Poller.prototype = new EventEmitter();
  Poller.prototype.constructor = Poller;
  Poller.prototype.__super__ = EventEmitter.prototype;

  Poller.prototype.poll = function () {
    // DEBUG
    console.log(this.count);
    if (this.count < this.totalcount) {
      var req, options = {};
      req = new Request();
      // XXX if (this.lastpolled) { options['after'] = this.lastpolled.toISOString() }
      req.on('success', function (data) {
        this.emit('poll', data);
      }, this);
      // DEBUG
      console.log('polling..');
      req.get(this.endpoint, options);
      this.lastpolled = new Date();
      this.count++;
      setTimeout(this.poll.bind(this), this.interval);
    }
  };

  exports.Poller = Poller;

}(window));

// ## dogjs
//
// Connects to dog servers
//
(function (exports) {
  'use strict';

  // `dogjs` is an augmented EventEmitter instance
  var dogjs = new EventEmitter(),
    asks, notifys, listens, oneachs, streamobjectseen = {};

  var pollinterval, pollcount;
  pollinterval = 1000;
  pollcount = 2; // FIXME More total polls needed, naturally

  function extractview(item) {
    var bag = {};
    if (item.properties && Utilities.isArray(item.properties)) {
      item.properties
      .filter(function (el) { return el.direction === 'output' })
      .forEach(function (prop) {
        bag[prop.identifier] = prop.value;
      });
    }
    return bag;
  }

  function sourcetotarget(sourcenode, item) {
    var targetnode, newnode, method, view;
    Utilities.assert(sourcenode.attributes['holder'], 'No holder for source element');
    targetnode = document.querySelector( sourcenode.attributes['holder'].value );
    method = targetnode.attributes['method'] && targetnode.attributes['method'].value;
    newnode = sourcenode.cloneNode(true);
    view = extractview(item);
    if (!Utilities.isEmpty(view)) {
      newnode.innerHTML = Mustache.render(sourcenode.innerHTML, view);
    } else {
      newnode.innerHTML = sourcenode.innerHTML;
    }
    switch(method) {
      case 'append':
      targetnode.appendChild(newnode);
      break;
      case 'replace':
      default:
      if ( Utilities.trim(targetnode.innerHTML) ) {
        return null;
      }
      targetnode.appendChild(newnode);
    }
    return newnode;
  }

  function onpoll(data) {
    data['items'].forEach(function (item) {
      var sourcenode, newnode;
      Utilities.assert(item.name.length, 'No name for item');
      switch(item.type) {
        // case 'Dog::RoutedTask':
        case 'ask':
        sourcenode = asks[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No ask template for item');
        // case 'Dog::RoutedEvent':
        case 'listen':
        sourcenode = sourcenode || listens[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No listen template for item');
        newnode = sourcetotarget( sourcenode, item );
        if (newnode) {
          newnode.method = 'post';
          newnode.action = '/dog/stream/' + item.id;
          // use AJAX for `form` submission
          Utilities.ajaxify(newnode);
        }
        break;
        // case 'Dog::RoutedMessage':
        case 'notify':
        sourcenode = notifys[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No notify template for item');
        if (!(item.id in streamobjectseen)) {
          newnode = sourcetotarget( sourcenode, item );
          streamobjectseen[ item.id ] = true;
        }
        break;
        // case 'Dog::Track'
        case 'track':
        if (!(item.id in streamobjectseen)) {
          var req = new Request();
          req.on('success', onpoll);
          req.get('/dog/stream/' + item.id);
          streamobjectseen[ item.id ] = true;
        }
        break;
        case 'oneach':
        sourcenode = oneachs[ Utilities.last(item.name) ];
        Utilities.assert(sourcenode, 'No oneach template for item');
        if (sourcenode.attributes['subscribe'] && sourcenode.attributes['subscribe'].value.match(/true/i)) {
          var subscriber = new Poller('/dog/stream/' + item.id, pollinterval, pollcount);
          subscriber.on('poll', onpoll);
          subscriber.poll();
        }
        break;
        default:
        throw new Error('Invalid type specification for item');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var elems, dogblock, subscriber;
    elems = document.getElementsByTagName('dog');
    Utilities.assert(elems.length, 'Missing <dog> .. </dog> templates section');
    dogblock = elems[0];
    dogblock.style.display = 'none';

    asks = {},
    oneachs = {},
    listens = {},
    notifys = {};

    // **Scan for Dog tags in the templates section**
    elems = dogblock.getElementsByTagName('form');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['ask']) {
        asks[ elem.attributes['ask'].value ] = elem;
      } else if (elem.attributes['listen']) {
        listens[ elem.attributes['listen'].value ] = elem;
      }
    });
    elems = dogblock.getElementsByTagName('section');
    Array.prototype.forEach.call(elems, function (elem) {
      if (elem.attributes['notify']) {
        notifys[ elem.attributes['notify'].value ] = elem;
      } else if (elem.attributes['oneach']) {
        oneachs[ elem.attributes['oneach'].value ] = elem;
      }
    });

    // **Setup polling**

    // root stream
    subscriber = new Poller('/dog/stream', pollinterval, pollcount);
    subscriber.on('poll', onpoll);
    subscriber.poll();

  }, false);

  exports.dogjs = dogjs;

}(window));
