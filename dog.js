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

  // needs to be invoked on arrlike object
  exports.filterOnly = function (arrlike, attr, validset) {
    if (!validset) { validset = attr; attr = null; }
    var valid = {};
    validset.forEach(function (v) {
      valid[v] = true;
    });
    return Array.prototype.filter.call(arrlike, function (el) {
      return (el[attr] || el) in valid;
    });
  }

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
  function map(objlike, iterator) {
    var key, i = 0, items;
    items = [];
    for (key in objlike) {
      if (objlike.hasOwnProperty(key)) {
        items.push(iterator(objlike[key], key, i));
        i++;
      }
    }
    return items;
  };
  exports.map = map;

  // iterator format is same as `map()`
  exports.forEach = function (objlike, iterator) {
    map.apply(this, arguments);
  };

  // ### Function extensions

  exports.defer = function (f, context) {
    window.setTimeout(f.bind(context || this), 0);
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
  exports.AssertionError = AssertionError;

  exports.assert = function (exp, msg) {
    if (!exp) {
      throw new AssertionError(msg);
    }
  };

  // ### Send form contents over AJAX.
  // Intercepts the `submit` event, and makes the submission manually.
  exports.ajaxify = function (form, options) {
    options = options || {};
    form.addEventListener('submit', function (ev) {
      Utilities.assert(!ev.defaultPrevented, 'Form submit was canceled by another party');
      if (form.checkValidity) {
        Utilities.assert(form.checkValidity(), 'Form inputs invalid');
      }
      ev.preventDefault();
      var req = new Request();
      req.on('success', function (data) {
        // event that can be subscribed to
        var ev = new CustomEvent('submitted', { detail: data });
        form.dispatchEvent(ev);
      });
      req.post(form.action, new FormData(form));
      if (options.resetForm) {
        form.reset();
      }
    });
    return form;
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

  EventEmitter.prototype.on = function (eventname, callback, context, runonemit) {
    if (this.listeners[eventname] === undefined) {
      this.listeners[eventname] = [];
      this.listeners[eventname].emitted = false;
    } else if (runonemit && this.listeners[eventname].emitted) {
      callback.apply(context || this);
    }
    this.listeners[eventname].push({ f: callback, c: context || this });
  };

  EventEmitter.prototype.emit = function (eventname) {
    if (this.listeners[eventname] !== undefined) {
      var args = Array.prototype.slice.call(arguments);
      var retvalues = [];
      this.listeners[eventname].forEach(function (listener) {
        var r = listener.f.apply(listener.c, args.slice(1));
        retvalues.push(r);
      }, this);
      this.listeners[eventname].emitted = true;
      return retvalues;
    }
  };

  exports.EventEmitter = EventEmitter;

}(window));

// ## Promise
//
// Using for cleaner asynchronous programming.
// Taken from [lie-to-me/lib/defers.js](https://github.com/babelon/lie-to-me/)
//
(function (exports) {

  function Promise () {
    this.continuations = [];
    this.contexts = [];
    this.stalled = function() {};
  };

  Promise.prototype.then = function(f, c) {
    if (typeof f !== 'function') { throw new TypeError("You must pass a function as the 'then' handler"); }
    this.continuations.push(f);
    this.contexts.push(c || this);
    return this;
  };

  Promise.prototype.instead = function(f) {
    if (typeof f !== 'function') { throw new TypeError("You must pass a function as the 'error' handler"); }
    this.stalled = f;
    return this;
  };

  /**
    God, this is beautiful.
    If you add a promise followon using .then(),
    the next .then() will be invoked after
    it finishes
  */
  Promise.prototype.resolve = function resolve() {
    var next, c, ret;
    if (!this.continuations.length) { return; }
    next = this.continuations.shift();
    c = this.contexts.shift();
    ret = next.apply(c, arguments);
    if (ret instanceof Promise) {
      ret.then(this.resolve, this);
    }
  };

  exports.Promise = Promise;

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
      if (req.forceHTML) {
        data = req.xhp.responseXML;
      } else {
        // assume JSON format with fallback
        try {
          data = JSON.parse(req.xhp.responseText);
        } catch (err) { }
      }
      req.emit('success', data || req.xhp.responseText, req.xhp.statusText);
    } else {
      console.log('Successful request with non-2XX status.');
      console.log(req.xhp);
      req.emit('error', req.xhp.statusText);
    }
  }

  function errored(req) {
    console.log('Unsuccessful request.');
    console.log(req.xhp);
    req.emit('error', req.xhp.statusText);
  }

  function Request(options) {
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
    options = options || {};
    this.forceHTML = !!options.forceHTML;
    if (this.forceHTML) {
      this.xhp.overrideMimeType('text/html');
      this.xhp.responseType = 'document';
    }
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

// ## Subscribers
//
// Handling the subscriptions, using just polling for now.
// Planned addition of websockets.
//
(function (exports) {
  'use strict';

  var Poller, pollendpoints = {};

  Poller = function (endpoint, interval, totalcount) {
    if (endpoint in pollendpoints) {
      throw new Error("Already subscribed to " + endpoint + " stream.");
    } else {
      pollendpoints[ endpoint ] = this;
    }
    this.__super__.constructor.call(this);
    this.endpoint = endpoint;
    this.interval = interval || 1000;
    this.totalcount = totalcount || 1000;
    this.lastpolled = null;
    this.count = 0;
    this.open = true;
  };

  Poller.prototype = new EventEmitter();
  Poller.prototype.constructor = Poller;
  Poller.prototype.__super__ = EventEmitter.prototype;

  Poller.prototype.poll = function () {
    if (this.open && this.count < this.totalcount) {
      var req, options = {};
      req = new Request();
      // FIXME if (this.lastpolled) { options['after'] = this.lastpolled.toISOString() }
      req.on('success', function (data) {
        var retvalues = this.emit('poll', data);
        if ( !retvalues.reduce(function (l, r) { return l && r; }) ) { this.close(); }
      }, this);
      req.get(this.endpoint, options);
      this.lastpolled = new Date();
      this.count++;
      setTimeout(this.poll.bind(this), this.interval);
    }
  };

  Poller.prototype.close = function () {
    this.open = false;
  };

  Poller.closeAll = function () {
    Utilities.forEach(pollendpoints, function (p, endpoint) {
      p.close();
    });
    pollendpoints = {};
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
    pageConfig = null,
    asks, notifys, listens, oneachs, streamobjectseen = {};

  var pollinterval, pollcount;
  pollinterval = 1000;
  pollcount = 1000; // FIXME More total polls needed, naturally

  function fqname(block, blockname) {
    name = [];
    name.push(blockname);
    while(block.attributes['oneach'] && (block.parentNode.tagName !== 'dog' || block.parentNode.tagName !== 'body' || block.parentNode.tagName !== 'html')) {
      name.push(block.attributes['oneach'].value);
      block = block.parentNode;
    }
    return name;
  }

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
    if(!dogjs.auth && sourcenode.attributes['authenticated'] && sourcenode.attributes['authenticated'].value.match(/true/i)) {
      return null;
    }
    Utilities.assert(sourcenode.attributes['holder'], 'No holder for source element');
    targetnode = document.querySelector( sourcenode.attributes['holder'].value );
    if (!targetnode) { console.info('Invalid target for holder:', sourcenode.attributes['holder'].value); return; }
    method = targetnode.attributes['method'] && targetnode.attributes['method'].value || 'fill';
    newnode = sourcenode.cloneNode(true);
    view = extractview(item);
    if (!Utilities.isEmpty(view)) {
      newnode.innerHTML = Mustache.render(sourcenode.innerHTML, view);
    } else {
      newnode.innerHTML = sourcenode.innerHTML;
    }
    newnode.dataset['id'] = item['id'];
    newnode.dataset['type'] = item['type'];
    switch(method) {
      case 'append':
      targetnode.appendChild(newnode);
      break;
      case 'prepend':
      targetnode.insertBefore(newnode, targetnode.firstChild);
      break;
      case 'fill':
      if (Utilities.trim(targetnode.innerHTML)) {
        return null;
      }
      case 'overwrite':
      // clean out `targetnode`
      while (targetnode.firstChild) {
        targetnode.removeChild(targetnode.firstChild);
      }
      targetnode.appendChild(newnode);
      break;
      default:
      throw new Error('Invalid method specified');
    }
    dogjs.emit('add:node', newnode);
    return newnode;
  }

  function runtimeactions(item) {
    var sourcenode, newnode;
    Utilities.assert(item.name.length, 'No name for item');
    if (item.id in streamobjectseen) {
      return;
    } else {
      streamobjectseen[ item.id ] = true;
    }
    switch(item.type) {
      // case 'Dog::RoutedTask':
      case 'ask':
      sourcenode = asks[ Utilities.last(item.name) ];
      if (!sourcenode) { return; } // 'No ask template for item'
      // case 'Dog::RoutedEvent':
      case 'listen':
      sourcenode = sourcenode || listens[ Utilities.last(item.name) ];
      if (!sourcenode) { return; } // 'No listen template for item'
      newnode = sourcetotarget( sourcenode, item );
      if (newnode) {
        newnode.method = 'post';
        newnode.action = '/dog/stream/object/' + item.id;
        // use AJAX for `form` submission
        Utilities.ajaxify(newnode);
        newnode.addEventListener('submitted', function (ev) {
          var eventtype = 'submitted' + ':' + item.type + ':' + Utilities.last(item.name);
          dogjs.emit(eventtype, ev.detail);
        });
      }
      break;
      // case 'Dog::RoutedMessage':
      case 'notify':
      sourcenode = notifys[ Utilities.last(item.name) ];
      if (!sourcenode) { return; } // 'No notify template for item'
      newnode = sourcetotarget( sourcenode, item );
      break;
      // case 'Dog::Track'
      case 'track':
      var subscriber = new Poller('/dog/stream/runtime/' + item.id);
      subscriber.on('poll', onpoll);
      subscriber.poll();
      break;
      case 'oneach':
      sourcenode = oneachs[ Utilities.last(item.name) ];
      if (!sourcenode) { return; } // 'No oneach template for item'
      sourcenode.dataset['id'] = item['id'];
      if (sourcenode.attributes['subscribe'] && sourcenode.attributes['subscribe'].value.match(/true/i)) {
        var subscriber = new Poller('/dog/stream/lexical/' + item.id, pollinterval, pollcount);
        subscriber.on('poll', onpoll);
        subscriber.poll();
      }
      break;
      case 'structure':
      case 'function':
      break;
      default:
      throw new Error('Invalid type specification for item');
    }
  }

  function onpoll(data) {
    var types = null, unsubscribe = false;
    if (data['self'] && data['self']['type'] === 'track') {
      switch (data['self']['state']) {
        case 'open':
        types = ['ask', 'listen', 'notify'];
        break;
        case 'listening':
        types = ['listen', 'notify'];
        unsubscribe = true;
        break;
        case 'closed':
        default:
        types = ['notify'];
        unsubscribe = true;
      }
    } else {
      types = ['track'];
    }
    Utilities.filterOnly(data['runtime'], 'type', types).forEach(runtimeactions);
    data['lexical'].forEach(runtimeactions);
    return !unsubscribe;
  }

  function fetchTemplates() {
    var promise, req, templateslocation;
    promise = new Promise();
    req = new Request({ forceHTML: true });
    templateslocation = pageConfig['templates'] || '/templates.html';
    req.on('success', function (dogblock) {
      Utilities.assert(dogblock, 'Missing templates from ' + pageConfig['templates']);

      asks = {},
      oneachs = {},
      listens = {},
      notifys = {};

      // Scan for Dog tags in the templates section
      // ------------------------------------------

      var elems = dogblock.getElementsByTagName('form');
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
      elems = dogblock.querySelectorAll( dogjs.auth ? '.authenticated' : '.unauthed' );
      Array.prototype.forEach.call(elems, function (elem) {
        var target = sourcetotarget(elem, { id: '', type: 'authentication' });
        if (target) {
          var provider = target.attributes['provider'] ? ('/' + target.attributes['provider'].value) : '';
          target.addEventListener('click', function () {
            if (dogjs.auth) {
              window.location = '/dog/account/logout';
            } else {
              window.location = '/dog/account' + provider + '/login';
            }
          });
        }
      });

      promise.resolve();

    });
    req.get(templateslocation);
    return promise;
  }

  function startTrackPolling() {
    // Setup polling
    // -------------

    // root stream
    var loaded = false;
    var subscriber = new Poller('/dog/stream/runtime/root', pollinterval, pollcount);
    subscriber.on('poll', function () {
      var retvalue = onpoll.apply(this, arguments);
      if (!loaded) {
        dogjs.emit('load');
        loaded = true;
      }
      return retvalue;
    });
    subscriber.poll();
  }

  function loadPageContents(ev) {
    var promise, hashname, source;
    promise = new Promise();
    Poller.closeAll();
    hashname = window.location.hash.substring(1);
    source = pageConfig[hashname] || ('/' + hashname + '.html');
    if (source) {
      var req = new Request({ forceHTML: true });
      req.get(source);
      req.on('success', function (fetchedDoc) {
        // need to append scripts to body separately
        // so that they are executed
        var scripts = fetchedDoc.getElementsByTagName('script');
        scripts = Array.prototype.map.call(scripts, function (s) {
          return s.parentNode.removeChild(s);
        });
        // append the scripts
        Array.prototype.forEach.call(scripts, function (s) {
          var scriptnode = document.createElement('script');
          scriptnode.type = s.type;
          scriptnode.charset = s.charset;
          scriptnode.innerHTML = s.innerHTML;
          scriptnode.src = s.src;
          document.body.appendChild(scriptnode);
        });
        // transfer the contents
        document.body.innerHTML = fetchedDoc.body.innerHTML;
        startTrackPolling();
        dogjs.emit('pageload');
        promise.resolve();
      });
      req.on('error', function () {
        startTrackPolling();
        dogjs.emit('pageload');
        promise.resolve();
      })
    } else {
      console.error('Invalid page contents to load: ' + destination);
      promise.abort();
    }
    return promise;
  }

  function changePage(destination) {
    // TODO destination in pageConfig ?
    if (destination) {
      window.location.hash = '#' + destination;
    } else {
      console.error("'" + destination + "' is not a valid page name.");
      ('home' in pageConfig) && changePage('home');
    }
  }

  function authenticationCheck() {
    var promise = new Promise();
    var req = new Request();
    req.get('/dog/account/status');
    req.on('success', function (status) {
      if (status["success"]) {
        dogjs.auth = status["authentication"];
        promise.resolve();
      } else {
        dogjs.auth = false;
        promise.abort();
      }
    });
    req.on('error', function () {
      dogjs.auth = false;
      promise.abort();
    });
    return promise;
  }

  function setupPages(config) {
    pageConfig = config;
  }

  function initialize() {
    // need a configuration
    pageConfig = pageConfig || {};

    var control = authenticationCheck();
    control.then(fetchTemplates);
    control.then(function () {
      // rely on the 'hashchange' event listener to do its work
      if (window.location.hash) {
        var ev = new HashChangeEvent('hashchange', { oldURL: window.location.href, newURL: window.location.href });
        window.dispatchEvent(ev);
      } else {
        window.location.hash = '#' + 'home';
      }
    });
    control.instead(function () {
      console.error('Startup error: ', arguments);
    });
    window.addEventListener('hashchange', loadPageContents);
  }

  exports.dogjs = dogjs;
  dogjs.setupPages = setupPages;
  dogjs.changePage = changePage;

  document.addEventListener('DOMContentLoaded', initialize);

}(window));
