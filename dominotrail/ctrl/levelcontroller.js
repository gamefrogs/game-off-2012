"use strict";

dt.LevelController = function(level, renderer) {
  this.level = level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
};

dt.LevelController.prototype.destroy = function() {
  this.renderer.removeObserver(this);
};

dt.LevelController.prototype.update = function(event) {
  if ((event.type === dt.EVENT_CELL_DOWN) && (event.button === dt.BUTTON_LEFT)) {
    this.level.addDomino(event.pos);
  } else {
    util.log("LevelController received ", event);
  }
};
