"use strict";


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
  this.setStatus(dt.ROUND_NOT_RUN);
  this.objs = [];
  this.outs = [];
  this.ins = [];
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

dt.Round.prototype.getAllObjects = function() {
  this.objs = [];
  for (var x = 0; x < this.level.getWidth(); ++x) {
    for (var y = 0; y < this.level.getHeight(); ++y) {
      var obj = this.level.getObjectXY(x, y);
      if ((obj !== undefined) && (obj instanceof dt.BasePiece)) {
        this.objs.push(new dt.Pos(x, y));
      }
    }
  }
};

dt.Round.prototype.start = function() {
  this.step = 0;
  this.getAllObjects();
  this.setStatus(dt.ROUND_RUNNING);
  util.log("Starting round");
  for (var o = 0; o < this.objs.length; ++o) {
    this.level.getObject(this.objs[o]).startRound();
  }
  this.outs = [];
};

dt.Round.prototype.reset = function() {
  for (var o = 0; o < this.objs.length; ++o) {
    this.level.getObject(this.objs[o]).reset();
  }
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

dt.Round.prototype.startStep = function() {
  for (var o = 0; o < this.objs.length; ++o) {
    var piece = this.level.getObject(this.objs[o]);
    piece.startStep(this.step);
  }
};

dt.Round.prototype.sendInputs = function() {
  for (var o = 0; o < this.objs.length; ++o) {
    var pos = this.objs[o];
    var piece = this.level.getObject(this.objs[o]);

    var relInputs = piece.getInputs();
    if (relInputs.length === 0) {
      piece.receiveInputs(relInputs);
      
    } else {
      var absInputs = dt.RelPosDir.arrayToAbsolute(relInputs, pos);
      var intersection = dt.AbsPosDir.arrayIntersect(absInputs, this.ins);
      if (intersection.length) {
        var relInter = dt.AbsPosDir.arrayToRelative(intersection, pos);
        piece.receiveInputs(relInter);
      }
    }
  }
};

dt.Round.prototype.runStep = function() {
  for (var o = 0; o < this.objs.length; ++o) {
    var piece = this.level.getObject(this.objs[o]);
    piece.runStep(this.step);
  }
};

dt.Round.prototype.transposeOutputs = function() {
  this.ins = [];
  for (var i = 0; i < this.outs.length; ++i) {
    var out = this.outs[i];
    this.ins[i] = out.transpose();
  }
};

dt.Round.prototype.collectOutputs = function() {
  this.outs = [];
  for (var o = 0; o < this.objs.length; ++o) {
    var pos = this.objs[o];
    var piece = this.level.getObject(pos);
    var outputs = piece.collectOutputs();
    if (outputs.length > 0) {
      this.outs = dt.AbsPosDir.arrayUnion(this.outs, dt.RelPosDir.arrayToAbsolute(outputs, pos));
    }
  }
  this.transposeOutputs();
};

dt.Round.prototype.endStep = function() {
  for (var o = 0; o < this.objs.length; ++o) {
    var piece = this.level.getObject(this.objs[o]);
    piece.endStep(this.step);
  }
};

dt.Round.prototype.isFinished = function() {
  if (this.ins.length > 0) {
    return false;
  }
  for (var o = 0; o < this.objs.length; ++o) {
    var piece = this.level.getObject(this.objs[o]);
    if (piece.isActive() || piece.canAutoActivate(this.step)) {
      return false;
    }
  }
  return true;
};

dt.Round.prototype.runWholeStep = function() {
  if (false) { // TODO find end condition
    this.end();
    return false;
  }

  this.setStep(this.step + 1);
  util.log("Running step " + this.step);
  
  this.startStep();

  this.sendInputs();

  this.runStep();

  /// Draw from percent = 0 to percent = 100

  this.collectOutputs();
  
  this.endStep();

  return !this.isFinished();
};

dt.Round.prototype.isSuccess = function() {
  return false;
  /*
  var goals = this.level.getGoalPositions();
  for (var i = 0; i < goals.length; ++i) {
    var obj = this.getObject(goals[i]);
    if ((obj === undefined) || (!obj.isDead())) {
      return false;
    }
  }
  return true;*/
};

dt.Round.prototype.end = function() {
  var success = this.isSuccess();
  this.setStatus(success ? dt.ROUND_END_SUCCESS : dt.ROUND_END_FAILURE);
};