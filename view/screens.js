"use strict";

var dt = dt || {};

dt.View = function(domRoot, game) {
  this.root = domRoot;
  this.game = game;
  
  this.initScreens();
  this.initEvents();
};

util.extend(util.Observable, dt.View);

// IDs of page elements that represent the screens
dt.View.SCREEN_SPLASH =  "splash";
dt.View.SCREEN_PROFILE = "profile";
dt.View.SCREEN_MENU =    "menu";
dt.View.SCREEN_ROUND =   "round";
dt.View.SCREEN_RESULT =  "result";
// All IDs
dt.View.SCREENS = [ dt.View.SCREEN_SPLASH,
                    dt.View.SCREEN_PROFILE,
                    dt.View.SCREEN_MENU,
                    dt.View.SCREEN_ROUND,
                    dt.View.SCREEN_RESULT
                  ];
                    
// Mapping between game states and screens
dt.View.STATE_SCREENS = {};
dt.View.STATE_SCREENS[dt.STATE_SPLASH]         = dt.View.SCREEN_SPLASH;
dt.View.STATE_SCREENS[dt.STATE_PROFILE_SELECT] = dt.View.SCREEN_PROFILE;
dt.View.STATE_SCREENS[dt.STATE_MENU]           = dt.View.SCREEN_MENU;
dt.View.STATE_SCREENS[dt.STATE_ROUND_LAYOUT]   = dt.View.SCREEN_ROUND;
dt.View.STATE_SCREENS[dt.STATE_ROUND_RUN]      = dt.View.SCREEN_ROUND;
dt.View.STATE_SCREENS[dt.STATE_ROUND_SUCCESS]  = dt.View.SCREEN_RESULT;
dt.View.STATE_SCREENS[dt.STATE_ROUND_FAILURE]  = dt.View.SCREEN_RESULT;

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

dt.View.prototype.initEvents = function() {
  this.game.addObserver(this);
};

dt.View.prototype.switchTo = function(name) {
  if (this.current !== name) {
    this[this.current].style.display = "none";
    this.current = name;
    this[this.current].style.display = "block";
  }
};

dt.View.prototype.update = function(event) {
  if (event.src === this.game) {
    if (event.type === dt.EVENT_STATE_CHANGE) {
      var nextScreen = dt.View.STATE_SCREENS[event.to];
      this.switchTo(nextScreen);
    } else {
      util.log("Received unknown event from game", event);
    }
  } else {
    util.log("Unknown source for event", event);
  }
};
