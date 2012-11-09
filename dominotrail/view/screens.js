"use strict";

var dt = dt || {};

// Events dispatched by the view
dt.EVENT_SWITCH_VIEW = "SwitchView";

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

  this.viewport = document.getElementById("viewport");
  this.ctx = this.viewport.getContext("2d");
  this.ctx.fillStyle = "#ffffff";
  this.ctx.fillRect(5, 5, this.viewport.width - 10, this.viewport.height - 10);
};

dt.View.prototype.initEvents = function() {
  this.game.addObserver(this);
};

dt.View.prototype.switchTo = function(name) {
  var old = this.current;
  if (old !== name) {
    this[old].style.display = "none";
    this.current = name;
    this[name].style.display = "block";
    this.notify({ src: this,
                  type: dt.EVENT_SWITCH_VIEW,
                  from: old,
                  to: name });
  }
};

dt.View.prototype.update = function(event) {
  if (event.src === this.game) {
    if (event.type === dt.EVENT_STATE_CHANGE) {
      var nextScreen = dt.View.STATE_SCREENS[event.to];
      this.switchTo(nextScreen);
      
      if (nextScreen === dt.View.SCREEN_ROUND) {
        this.renderer.init();
      }

    } else if (event.type === dt.EVENT_CREATE_ROUND) {
      this.renderer = new dt.LevelRenderer(event.round.level, this.viewport, this.ctx);

    } else if (event.type === dt.EVENT_DESTROY_ROUND) {
      this.renderer.destroy();
      this.renderer = null;
      
    } else {
      util.log("Received unknown event from game", event);
    }
  } else {
    util.log("Unknown source for event", event);
  }
};
