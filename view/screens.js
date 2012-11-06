"use strict";

var dt = dt || {};

dt.View = function(domRoot) {
  this.root = domRoot;
  this.initScreens();
};

dt.View.SCREENS = [ "splash",
                    "profile",
                    "menu",
                    "round",
                    "result" ];

dt.View.prototype.initScreens = function() {
  for (var s = 0; s < dt.View.SCREENS.length; ++s) {
    var name = dt.View.SCREENS[s];
    var screen = document.getElementById(name);
    this[name] = screen;
    if (s === 0) {
      this.current = name;
      screen.style.display = "block";
    } else {
      screen.style.display = "none";
    }
  }
};

dt.View.prototype.switchTo = function(name) {
  if (this.current !== name) {
    this[this.current].style.display = "none";
    this.current = name;
    this[this.current].style.display = "block";
  }
};

