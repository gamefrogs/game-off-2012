"use strict";

dt.Profile = function(name) {
  this.name = name;
  this.lockedLevels = {};
  this.doneLevels = {};
};

dt.Profile.prototype.load = function() {
  var valueStr = localStorage.getItem("dominotrail." + this.name);
  if (valueStr) {
    var saveGame = JSON.parse(valueStr);
    this.lockedLevels = saveGame.locked;
    this.doneLevels = saveGame.done;
  }
};

dt.Profile.prototype.save = function() {
  var saveGame = { locked: this.lockedLevels,
                   done: this.doneLevels };
  var valueStr = JSON.stringify(saveGame);
  localStorage.setItem("dominotrail." + this.name, valueStr);
};

dt.Profile.prototype.setLocked = function(level, locked) {
  this.lockedLevels[level.getTitle()] = locked;
};

dt.Profile.prototype.setDone = function(level, done) {
  this.doneLevels[level.getTitle()] = done;
};

dt.Profile.prototype.isLocked = function(level) {
  if (this.lockedLevels.hasOwnProperty(level.getTitle())) {
    return this.lockedLevels[level.getTitle()];
    
  } else if (level.hasOwnProperty("locked")) {
    return level.locked;

  } else {
    return true;
  }
};

dt.Profile.prototype.isDone = function(level) {
  if (this.doneLevels.hasOwnProperty(level.getTitle())) {
    return this.doneLevels[level.getTitle()];
  } else {
    return false;
  }
};


dt.Profile.cheat = function() {
  dt.Profile.prototype._isLocked = dt.Profile.prototype.isLocked;
  dt.Profile.prototype.isLocked = function() { return false; };
};

dt.Profile.uncheat = function() {
  dt.Profile.prototype.isLocked = dt.Profile.prototype._isLocked;
};

dt.Profile.reset = function() {
  localStorage.removeItem("dominotrail.defaultProfile");
};