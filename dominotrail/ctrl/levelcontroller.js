"use strict";

dt.LevelController = function(round, renderer) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
};

dt.LevelController.prototype.destroy = function() {
  this.renderer.removeObserver(this);
};

dt.LevelController.prototype.update = function(event) {
  if ((event.type === dt.EVENT_CELL_DOWN) && (event.button === dt.BUTTON_LEFT)) {
    // TODO check that we are still in the "layout" mode, not running
    this.level.addDomino(event.pos);
  } else {
    util.log("LevelController received ", event);
  }
};
