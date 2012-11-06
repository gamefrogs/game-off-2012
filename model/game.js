"use strict";
var dt = dt || {};

// Possible game states
dt.STATE_SPLASH =         "Splash";        // On the splash screen
dt.STATE_PROFILE_SELECT = "ProfileSelect"; // Selecting player profile
dt.STATE_MENU =           "Menu";;         // Menu to select a level
dt.STATE_ROUND_LAYOUT =   "RoundLayout";   // Level round, laying out the dominos and objects
dt.STATE_ROUND_RUN =      "RoundRun";      // Level round, playing the dominos
dt.STATE_ROUND_SUCCESS =  "RoundSuccess";  // Level round succeeded
dt.STATE_ROUND_FAILURE =  "RoundFailure";  // Level round failure

// Possible game events
dt.EVENT_STATE_CHANGE = "StateChange";


// Top-level logic class. Singleton.
dt.Game = function() {
  this.state = dt.STATE_SPLASH;
  // Current player profile
  this.profile = null;
  // Loaded level definitions
  this.levels = null;
  // Current game round
  this.round = null;
};

dt.Game.prototype.changeState = function(nextState) {
  if (nextState !== this.state) {
    var event = { src: this,
                  type: dt.EVENT_STATE_CHANGE,
                  from: this.state,
                  to: nextState };
    this.state = nextState;
    this.notify(event);
  }
};


util.Observable.makeObservable(dt.Game);
