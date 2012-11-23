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
// Other IDs
dt.View.LEVELS_DIV = "levels";
                    
// Mapping between game states and screens
dt.View.STATE_SCREENS = {};
dt.View.STATE_SCREENS[dt.STATE_SPLASH]         = dt.View.SCREEN_SPLASH;
dt.View.STATE_SCREENS[dt.STATE_PROFILE_SELECT] = dt.View.SCREEN_PROFILE;
dt.View.STATE_SCREENS[dt.STATE_MENU]           = dt.View.SCREEN_MENU;
dt.View.STATE_SCREENS[dt.STATE_ROUND_LAYOUT]   = dt.View.SCREEN_ROUND;
dt.View.STATE_SCREENS[dt.STATE_ROUND_RUN]      = dt.View.SCREEN_ROUND;
dt.View.STATE_SCREENS[dt.STATE_ROUND_SUCCESS]  = dt.View.SCREEN_ROUND;
dt.View.STATE_SCREENS[dt.STATE_ROUND_FAILURE]  = dt.View.SCREEN_ROUND;

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
  this.root.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  }, false);
};

dt.View.prototype.createLevelButtons = function() {
  var levels = this.game.getLevels();
  // First create the whole HTML modifications
  for (var l = 0; l < levels.length; ++l) {
    this.createLevelButton(l + 1, levels[l]);
  }
  // Then add listeners
  for (l = 0; l < levels.length; ++l) {
    this.attachLevelButton(l + 1, levels[l]);
  }
};

dt.View.prototype.createLevelButton = function(id, level) {
  var menuDiv = document.getElementById(dt.View.LEVELS_DIV);
  var buttonStr = ('<a id="level' + id + '" class="button" href="javascript:util.nop();">Level ' +
                   id + ': ' + level.title + '</a><br>');
  menuDiv.innerHTML += buttonStr;
};

dt.View.prototype.attachLevelButton = function(id, level) {
  var that = this;
  var link = document.getElementById("level" + id);
  if (!link) {
    util.log("Link not available: level" + id);
    return;
  } 
  document.getElementById("level" + id).addEventListener("click",
                                                         function() {
                                                           that.game.startRound(id);
                                                         },
                                                         false); 
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

dt.View.prototype.setVisible = function(name, visible) {
  this[name].style.display = (visible ? "block" : "none");
};

dt.View.prototype.showSuccess = function() {
  var title = document.getElementById("result_title");
  title.innerHTML = "SUCCESS!";
  this.setVisible(dt.View.SCREEN_RESULT, true);
};

dt.View.prototype.showFailure = function() {
  var title = document.getElementById("result_title");
  title.innerHTML = "FAILURE!";
  this.setVisible(dt.View.SCREEN_RESULT, true);
};

dt.View.prototype.hideResult = function() {
  this.setVisible(dt.View.SCREEN_RESULT, false);
};

dt.View.prototype.update = function(event) {
  if (event.src === this.game) {
    if (event.type === dt.EVENT_STATE_CHANGE) {
      var prevScreen = dt.View.STATE_SCREENS[event.from];
      var nextScreen = dt.View.STATE_SCREENS[event.to];
      this.switchTo(nextScreen);
      
      if (event.to === dt.STATE_ROUND_LAYOUT) {
        this.renderer.init();
        this.pieceSelector.init();
      }

      if (event.to === dt.STATE_ROUND_SUCCESS) {
        this.showSuccess();
      } else if (event.to === dt.STATE_ROUND_FAILURE) {
        this.showFailure();
      } else {
        this.hideResult();
      }

    } else if (event.type === dt.EVENT_CREATE_ROUND) {
      this.renderer = new dt.LevelRenderer(event.round, this.viewport, this.ctx);
      var selectorCanvas = document.getElementById("piece_selector");
      this.pieceSelector = new dt.PieceSelector(event.round, selectorCanvas,
                                                selectorCanvas.getContext("2d"));
      this.controller = new dt.LevelController(event.round, this.renderer, this.pieceSelector);

    } else if (event.type === dt.EVENT_DESTROY_ROUND) {
      this.controller.destroy();
      this.renderer.destroy();
      this.pieceSelector.destroy();
      this.renderer = null;
      this.pieceSelector = null;
      
    } else {
      util.log("Received unknown event from game", event);
    }
  } else {
    util.log("Unknown source for event", event);
  }
};
