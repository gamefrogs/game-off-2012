"use strict";

var util = {};

util.global = this;
util.nop = function() {};

util.getPagePosition = function(elem) {
  var x = 0;
  var y = 0;
  var e = elem;
  while (e) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
};

util.init = function() {
  util.initLog();
  util.initScroll();
};

util.initLog = function() {
  if (!window.console) {
    if (window.opera) {
      util.log = opera.postError;
    } else {
      util.log = util.nop;
    }
  } else if (console.log["apply"]) {
    // Chrome does not allow direct aliasing of console.log... but console.log is a normal
    //  javascript function with an "apply" method
    util.log = function() { console.log.apply(console, arguments); };
  } else {
    // IE9 has console.log, but it's not a real function: no apply available
    // Also, arguments is not a real array, so no join()...
    // And it's only available when developer tools are open
    util.log = function() { var args = [];
                            for (var i in arguments) args.push(arguments[i]);
                            console.log(args.join(" "));
                          };
  }
};

util.initScroll = function() {
  if (window.scrollX !== undefined) {
    util.windowScrollX = function() {
      return window.scrollX;
    };
    util.windowScrollY = function() {
      return window.scrollY;
    };
  } else {
    // This is for Internet Explorer
    util.windowScrollX = function() {
      return document.body.parentNode.scrollLeft;
    };
    util.windowScrollY = function() {
      return document.body.parentNode.scrollTop;
    };
  }
};

// 'Inheritance'
util.extend = function(base, derived, onlyFunctions) {
  var proto = (base instanceof Function) ? base.prototype : base;
  var derivedProto = (derived instanceof Function) ? derived.prototype : derived;
  for (var key in proto) {
    if (proto.hasOwnProperty(key)) {
      var value = proto[key];
      if ((value instanceof Function) || !onlyFunctions) {
        derivedProto[key] = value;
      }
    }
  }
};

// Dynamic constructor call, borrowed (and adapted) from
// http://stackoverflow.com/questions/3871731/dynamic-object-construction-in-javascript
util.applyConstructor = function(ctor, params) {
  // Use a fake constructor function with the target constructor's
  // `prototype` property to create the object with the right prototype
  var dynCtor = function() {};
  dynCtor.prototype = ctor.prototype;
  var obj = new dynCtor();
  
  // Set the object's `constructor`
  obj.constructor = ctor;
  
  // Call the constructor function
  var newobj = ctor.apply(obj, params);
  
  // Use the returned object if there is one.
  // Note that we handle the funky edge case of the `Function` constructor,
  // thanks to Mike's comment below. Double-checked the spec, that should be
  // the lot.
  if ((newobj !== null) &&
      (typeof newobj === "object" || typeof newobj === "function")) {
    return newobj;
    
  } else {
    return obj;
  }
}

// Enum-like class and objects. enumClass should be a constructor taking id and name as arguments
util.makeEnum = function(enumClass) {
  enumClass.ALL = [];
  for (var i = 1; i < arguments.length; i += 2) {
    var id = arguments[i];
    var name = arguments[i + 1];
    var value = util.applyConstructor(enumClass, [id, name]);
    enumClass.ALL[id] = value;
    enumClass[name] = value;
    enumClass[name + "_ID"] = id;
  }
};

// Observable pattern
util.Observable = function() {};

util.Observable.prototype.addObserver = function(observer) {
  if (!this.observers) {
    this.observers = [];
  }
  this.observers.push(observer);
};

util.Observable.prototype.removeObserver = function(observer) {
  if (this.observers) {
    for (var i = 0; i < this.observers.length; ++i) {
      if (this.observers[i] === observer) {
        this.observers.splice(i, 1);
        --i;
      }
    }
    if (this.observers.length == 0) {
      delete this.observers;
    }
  }
};

util.Observable.prototype.notify = function(event) {
  if (this.observers) {
    for (var i = 0; i < this.observers.length; ++i) {
      this.observers[i].update(event);
    }
  }
};

util.Observable.makeObservable = function(klass_or_obj) {
  util.extend(util.Observable, klass_or_obj);
};
