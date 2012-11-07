"use strict";
var dt = dt || {};

dt.Controller = function(view, game) {
  this.view = view;
  this.game = game;

  this.initEvents();
};

dt.Controller.prototype.initEvents = function() {
  var that = this;
  dt.Controller.attachButton("play", function(event) {
    that.game.changeState(dt.STATE_PROFILE_SELECT);
  });
  for (var i = 1; i <= 3; ++i) {
    dt.Controller.attachButton("profile" + i, (function(pid) {
      return function(event) {
        that.game.chooseProfile(pid);
        that.game.changeState(dt.STATE_MENU);
      };
    })(i));
  }
  dt.Controller.attachButton("menu_back", function(event) {
    that.game.changeState(dt.STATE_PROFILE_SELECT);
  });
  for (var i = 1; i <= 5; ++i) {
    dt.Controller.attachButton("level" + i, (function(lid) {
      return function(event) {
        that.game.startRound(lid);
      };
    })(i));
  }
  dt.Controller.attachButton("round_quit", function(event) {
    that.game.quitRound();
  });
  dt.Controller.attachButton("round_run", function(event) {
    that.game.runRound();
  });

  dt.Controller.attachButton("next_level", function(event) {
    that.game.nextRound();
  });
  dt.Controller.attachButton("replay_level", function(event) {
    that.game.replayRound();
  });
  dt.Controller.attachButton("result_quit", function(event) {
    that.game.quitRound();
  });
  
  this.view.addObserver(this);
};

dt.Controller.attachButton = function(id, func) {
  document.getElementById(id).addEventListener("click", func);
};

dt.Controller.prototype.update = function(event) {
  util.log("Controller received event", event);
};

