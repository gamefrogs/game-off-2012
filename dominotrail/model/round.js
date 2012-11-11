"use strict";

dt.EVENT_ROUND_STATUS_CHANGE = "RoundStatusChange";
dt.EVENT_ROUND_STEP_CHANGE = "RoundStepChange";

dt.ROUND_NOT_RUN = "NotRun";
dt.ROUND_RUNNING = "Running";
dt.ROUND_END_SUCCESS = "EndSuccess";
dt.ROUND_END_FAILURE = "EndFailure";

dt.Round = function(def) {
  this.level = new dt.Level(def);
  this.step = 0;
  this.live = []; // Array of cell positions that are currently "live", doing something
  this.status = dt.ROUND_NOT_RUN;
};

util.extend(util.Observable, dt.Round);

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
  this.setStatus(dt.ROUND_RUNNING);
  util.log("Starting at", this.live);
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
  if (!this.level.isInside(pos)) {
    return undefined;
  }
  // TODO change the object returned if it has changed in the round (fallen dominos, for instance)
  return this.level.getObject(pos);
};

dt.Round.prototype.cleanupLiveObjects = function(nextLive) {
  // Make sure that all positions that have been identified as the "next live" are not dead yet
  this.live = [];
  for (var i = 0; i < nextLive.length; ++i) {
    var pos = nextLive[i];
    var obj = this.getObject(pos);
    if (!obj.dead) {
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
      if ((nextObj !== undefined) && (!nextObj.dead)) {
        // TODO check that the object is still activable
        nextLive.push(nextPos);
      }
    }
  }
  
  this.cleanupLiveObjects(nextLive);
  return true;
};

dt.Round.prototype.end = function() {
  var success = (Math.random() < 0.5);
  this.setStatus(success ? dt.ROUND_END_SUCCESS : dt.ROUND_END_FAILURE);
};