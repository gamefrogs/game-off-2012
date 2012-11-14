"use strict";

dt.LevelController = function(round, renderer) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
  this.round.addObserver(this);
};

dt.LevelController.prototype.destroy = function() {
  this.renderer.removeObserver(this);
};

dt.LevelController.prototype.update = function(event) {
  if (event.src === this.renderer) {
    if ((event.type === dt.EVENT_CELL_DOWN) && (event.button === dt.BUTTON_LEFT)) {
      // TODO check that we are still in the "layout" mode, not running
      if (this.level.canAddDomino(event.pos)) {
        this.level.addDomino(event.pos);
      }
    } else {
      util.log("LevelController received ", event);
    }
  } else if (event.src === this.round) {
    if (event.type === dt.EVENT_ROUND_STATUS_CHANGE) {
      util.log("LevelController received round status change from " + event.from +
               " to " + event.to);
      if (event.to === dt.ROUND_RUNNING) {
        this.runRound();
      }
    } else {
      util.log("LevelController received ", event);
    }
  }
};

dt.LevelController.prototype.runRound = function() {
  var DELAY = 30;
  var ANIM_STEP = 3;
  var that = this;
  var last = new Date().getTime() - DELAY;
  var anim = -1;
  
  var stepFunc = function() {
    var stillLive = true;
    if (anim === -1) {
      that.round.runStepFirstHalf();
      anim = 0;
      
    } else if (anim >= 100) {
      stillLive = that.round.runStepSecondHalf();
      anim = -1;
      
    } else {
      util.log("Tick");
      anim += ANIM_STEP;
    }
    that.renderer.render(anim);
    
    if (stillLive) {
      var now = new Date().getTime();
      var delay = 2 * DELAY - (now - last);
      last = now;
      window.setTimeout(stepFunc, delay);
    } else {
      that.round.end();
    }
  };
  stepFunc();
};