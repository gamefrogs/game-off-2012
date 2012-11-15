"use strict";

dt.MODE_DOMINO = "ModeDomino";
dt.MODE_PIECE = "ModePiece";

dt.PIECE_BUTTONS = ["piece_domino", "piece_bridge"];
dt.DIR_BUTTONS = ["dir_E", "dir_SE", "dir_SW", "dir_W", "dir_NW", "dir_NE" ];

dt.LevelController = function(round, renderer) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
  this.round.addObserver(this);

  this.initListeners();
  
  this.mode = dt.MODE_PIECE; 
  this.pieceType = dt.BridgePiece;
  this.dir = dt.Dir.E;
  this.params = {};

  this.highlightFrom("piece_bridge", dt.PIECE_BUTTONS);
  this.chooseBridge();
  this.highlightFrom("dir_E", dt.DIR_BUTTONS);
  this.chooseDir(dt.Dir.E);
};

dt.LevelController.prototype.initListeners = function() {
  var that = this;
  this.eventListeners = [];
  this.addListener("piece_domino", "click", function(event) {
    that.highlightFrom("piece_domino", dt.PIECE_BUTTONS);
    that.chooseDomino();
  });
  this.addListener("piece_bridge", "click", function(event) {
    that.highlightFrom("piece_bridge", dt.PIECE_BUTTONS);
    that.chooseBridge();
  });

  this.addListener("dir_E", "click", function(event) {
    that.highlightFrom("dir_E", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.E);
  });
  this.addListener("dir_SE", "click", function(event) {
    that.highlightFrom("dir_SE", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.SE);
  });
  this.addListener("dir_SW", "click", function(event) {
    that.highlightFrom("dir_SW", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.SW);
  });
  this.addListener("dir_W", "click", function(event) {
    that.highlightFrom("dir_W", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.W);
  });
  this.addListener("dir_NW", "click", function(event) {
    that.highlightFrom("dir_NW", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.NW);
  });
  this.addListener("dir_NE", "click", function(event) {
    that.highlightFrom("dir_NE", dt.DIR_BUTTONS);
    that.chooseDir(dt.Dir.NE);
  });
};

dt.LevelController.prototype.addListener = function(id, event, func) {
  var element = document.getElementById(id);
  var listenerRecord = { element: element, event: event, func: func };
  element.addEventListener(event, func, false);
  this.eventListeners.push(listenerRecord);
};

dt.LevelController.prototype.exitListeners = function() {
  for (var i = 0; i < this.eventListeners.length; ++i) {
    var listenerRecord = this.eventListeners[i];
    listenerRecord.element.removeEventListener(listenerRecord.event, listenerRecord.func, false);
  }
  this.eventListeners = undefined;
};

dt.LevelController.prototype.destroy = function() {
  this.exitListeners();
  this.round.removeObserver(this);
  this.renderer.removeObserver(this);
};

dt.LevelController.prototype.highlightFrom = function(id, all) {
  for (var i = 0; i < all.length; ++i) {
    var buttonId = all[i];
    var buttonElem = document.getElementById(buttonId);
    if (buttonId === id) {
      buttonElem.className = "sbutton sbuttonselected";
    } else {
      buttonElem.className = "sbutton";
    }
  }
};

dt.LevelController.prototype.chooseDomino = function() {
  this.mode = dt.MODE_DOMINO;
};

dt.LevelController.prototype.chooseBridge = function() {
  this.mode = dt.MODE_PIECE;
};

dt.LevelController.prototype.chooseDir = function(dir) {
  this.dir = dir;
  this.preparePiece();
};

dt.LevelController.prototype.preparePiece = function() {
  this.piece = this.pieceType.create(this.dir, this.params);
};

dt.LevelController.prototype.update = function(event) {
  if (event.src === this.renderer) {
    if ((event.type === dt.EVENT_CELL_DOWN) && (event.button === dt.BUTTON_LEFT)) {
      // TODO check that we are still in the "layout" mode, not running
      if (this.mode === dt.MODE_DOMINO) {
        if (this.level.canAddDomino(event.pos)) {
          this.level.addDomino(event.pos);
        }
        
      } else {
        if (this.level.canAddPiece(event.pos, this.piece)) {
          this.level.addPiece(event.pos, this.piece);
          this.preparePiece();
        }
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