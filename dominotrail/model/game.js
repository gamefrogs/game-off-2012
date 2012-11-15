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
dt.EVENT_STATE_CHANGE   = "StateChange";
dt.EVENT_PROFILE_CHANGE = "ProfileChange";
dt.EVENT_CREATE_ROUND   = "CreateRound";
dt.EVENT_DESTROY_ROUND  = "DestroyRound";

// Top-level logic class. Singleton.
dt.Game = function() {
  this.state = dt.STATE_SPLASH;
  // Current player profile
  this.profile = null;
  // Loaded level definitions
  this.levels = dt.LEVELS;
  // Current game level id
  this.levelId = -1;
  // Current game round
  this.round = null;
};

util.Observable.makeObservable(dt.Game);

dt.Game.prototype.getLevels = function() {
  return this.levels;
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

dt.Game.prototype.chooseProfile = function(profileId) {
  this.profile = profileId; //
  this.notify({ src: this,
                type: dt.EVENT_PROFILE_CHANGE,
                profile: this.profile
              });
};

dt.Game.prototype.startRound = function(levelId) {
  this.levelId = levelId;

  var levelDef = dt.LEVELS[levelId - 1];
  this.round = new dt.Round(levelDef);
  this.round.addObserver(this);
  this.notify({ src: this,
                type: dt.EVENT_CREATE_ROUND,
                round: this.round });
  
  this.changeState(dt.STATE_ROUND_LAYOUT);
};

dt.Game.prototype.destroyRound = function() {
  this.notify({ src: this,
                type: dt.EVENT_DESTROY_ROUND,
                round: this.round });
  this.round.removeObserver(this);
  this.round = null;
};

dt.Game.prototype.quitRound = function() {
  this.levelId = -1;
  this.changeState(dt.STATE_MENU);
  this.destroyRound();
};

dt.Game.prototype.runRound = function() {
  this.changeState(dt.STATE_ROUND_RUN);

  this.round.start();
};

dt.Game.prototype.endRound = function(success) {
  if (success) {
    this.changeState(dt.STATE_ROUND_SUCCESS);
  } else {
    this.changeState(dt.STATE_ROUND_FAILURE);
  }
};

dt.Game.prototype.nextRound = function() {
  this.destroyRound();
  this.startRound(this.levelId + 1);
};

dt.Game.prototype.replayRound = function() {
  /**this.destroyRound();
  this.startRound(this.levelId);*/
  this.round.reset();
  this.changeState(dt.STATE_ROUND_LAYOUT);
};

dt.Game.prototype.update = function(event) {
  if (event.src === this.round) {
    if (event.type === dt.EVENT_ROUND_STATUS_CHANGE) {
      if (event.to === dt.ROUND_END_SUCCESS) {
        this.endRound(true);
      } else if (event.to == dt.ROUND_END_FAILURE) {
        this.endRound(false);
      }
    }
    util.log("Game received from Round", event);
  } else {
    util.log("Game received", event);
  }
}

