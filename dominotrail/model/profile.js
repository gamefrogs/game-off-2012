"use strict";

dt.Profile = function(name) {
  this.name = name;
  this.lockedLevels = {};
};

dt.Profile.prototype.setLocked = function(level, locked) {
  this.lockedLevels[level.getTitle()] = locked;
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
