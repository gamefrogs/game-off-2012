"use strict";


// Proxy wraps a level object for runtime properties ---
dt.Proxy = function(obj) {
  this.delegate = obj;
  this.dead = false;
};

util.delegate(dt.TileObject, dt.Proxy);

dt.Proxy.prototype.die = function() {
  this.dead = true;
};

dt.Proxy.prototype.isDead = function() {
  return this.dead;
};

// Round class represent a level currently in progress (layout or run) ----
dt.EVENT_ROUND_STATUS_CHANGE = "RoundStatusChange";
dt.EVENT_ROUND_STEP_CHANGE = "RoundStepChange";

dt.ROUND_NOT_RUN = "NotRun";
dt.ROUND_RUNNING = "Running";
dt.ROUND_END_SUCCESS = "EndSuccess";
dt.ROUND_END_FAILURE = "EndFailure";

dt.Round = function(def) {
  this.level = new dt.Level(def);
  this.init();
};

util.extend(util.Observable, dt.Round);

dt.Round.prototype.init = function() {
  this.setStep(0);
  this.live = []; // Array of cell positions that are currently "live", doing something
  this.setStatus(dt.ROUND_NOT_RUN);
  this.proxies = null;
};

dt.Round.prototype.setStatus = function(status) {
  if (status !== this.status) {
    var old = this.status;
    this.status = status;
    
    this.notify({ src: this,
                  type: dt.EVENT_ROUND_STATUS_CHANGE,
                  from: old,
                  to: status });
  }
};

dt.Round.prototype.start = function() {
  this.step = 0;
  this.live = this.level.getStartPositions();
  this.proxies = new dt.Hexgrid(this.level.getWidth(), this.level.getHeight());
  this.setStatus(dt.ROUND_RUNNING);
  util.log("Starting at", this.live);
};

dt.Round.prototype.reset = function() {
  this.init();
};

dt.Round.prototype.setStep = function(step) {
  if (step !== this.step) {
    this.step = step;
    this.notify({ src: this,
                  type: dt.EVENT_ROUND_STEP_CHANGE,
                  step: step });
  }
};

dt.Round.prototype.getObject = function(pos) {
  return this.getObjectXY(pos.x, pos.y);
};

dt.Round.prototype.getObjectXY = function(x, y) {
  if (!this.level.isInsideXY(x, y)) {
    return undefined;
  }
  if (this.status === dt.ROUND_NOT_RUN) {
    return this.level.getObjectXY(x, y);
  }
  var proxy = this.proxies.getValueXY(x, y);
  if (proxy === undefined) {
    //proxy = this.level.getObject(pos);
    var obj = this.level.getObjectXY(x, y);
    if (obj !== undefined) {
      proxy = new dt.Proxy(obj);
      this.proxies.setValueXY(x, y, proxy);
    }
  }
  return proxy;
};

dt.Round.prototype.cleanupLiveObjects = function(nextLive) {
  // Make sure that all positions that have been identified as the "next live" are not dead yet
  this.live = [];
  for (var i = 0; i < nextLive.length; ++i) {
    var pos = nextLive[i];
    var obj = this.getObject(pos);
    if (!obj.isDead()) {
      this.live.push(pos);
    }
  }
};

dt.Round.prototype.runStep = function() {
  if (this.live.length === 0) {
    this.end();
    return false;
  }

  this.setStep(this.step + 1);

  var nextLive = [];
  for (var i = 0; i < this.live.length; ++i) {
    var pos = this.live[i];
    var obj = this.getObject(pos);
    // TODO take length of activity into account (terrain speed or special objects)
    obj.die();
    var dests = obj.getDestinations();
    for (var d = 0; d < dests.length; ++d) {
      var dest = dests[d];
      var nextPos = pos.dir(dest);
      var nextObj = this.getObject(nextPos);
      if ((nextObj !== undefined) && (!nextObj.isDead())) {
        // TODO check that the object is still activable
        nextLive.push(nextPos);
      }
    }
  }
  
  this.cleanupLiveObjects(nextLive);
  return true;
};

dt.Round.prototype.isSuccess = function() {
  var goals = this.level.getGoalPositions();
  for (var i = 0; i < goals.length; ++i) {
    var obj = this.getObject(goals[i]);
    if ((obj === undefined) || (!obj.isDead())) {
      return false;
    }
  }
  return true;
};

dt.Round.prototype.end = function() {
  var success = this.isSuccess();
  this.setStatus(success ? dt.ROUND_END_SUCCESS : dt.ROUND_END_FAILURE);
};