"use strict";

dt.MODE_DOMINO = "ModeDomino";
dt.MODE_PIECE = "ModePiece";
dt.MODE_ERASER = "ModeEraser";

dt.PIECE_BUTTONS = [];

dt.USABLE_PIECES = [{type: dt.BridgePiece,          name: "Bridge"},
                    {type: dt.TurnRightDominoPiece, name: "R.&nbsp;Turn"},
                    {type: dt.TurnLeftDominoPiece,  name: "L.&nbsp;Turn"},
                    {type: dt.ForkDominoPiece,      name: "Fork"},
		    {type: dt.RForkDominoPiece,     name: "R.Fork"},
		    {type: dt.LForkDominoPiece,     name: "L.Fork"},
                    {type: dt.TriForkDominoPiece,   name: "3&nbsp;Fork"}
                   ];
dt.DIR_BUTTONS = ["dir_E", "dir_SE", "dir_SW", "dir_W", "dir_NW", "dir_NE" ];

dt.LevelController = function(round, renderer) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
  this.round.addObserver(this);

  this.initListeners();
  
  this.mode = dt.MODE_DOMINO; 
  this.params = {};

  this.highlightFrom("dir_E", dt.DIR_BUTTONS);
  this.chooseDir(dt.Dir.E);
  this.highlightFrom("piece_0", dt.PIECE_BUTTONS);
  this.choosePieceType(dt.USABLE_PIECES[0].type);
};

dt.LevelController.prototype.createPieceButton = function(id, label) {
  var panel = document.getElementById("piece_buttons");
  panel.innerHTML += '<span id="' + id + '" class="sbutton">' + label + '</span><br>';
};

dt.LevelController.prototype.destroyPieceButtons = function() {
  var panel = document.getElementById("piece_buttons");
  panel.innerHTML = "";
};

dt.LevelController.prototype.makePieceListener = function(id, pieceType) {
  var that = this;
  return function(event) {
    that.highlightFrom(id, dt.PIECE_BUTTONS);
    that.choosePieceType(pieceType);
  }
};

dt.LevelController.prototype.initListeners = function() {
  var that = this;
  this.eventListeners = [];
  dt.PIECE_BUTTONS.push("piece_domino");
  // Create all buttons in HTML before attaching listeners
  this.createPieceButton("piece_eraser", "Erase");
  this.createPieceButton("piece_domino", "Domino");
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var id = "piece_" + i;
    dt.PIECE_BUTTONS.push(id);
    this.createPieceButton(id, dt.USABLE_PIECES[i].name);
  }

  this.addListener("piece_domino", "click", function(event) {
    that.highlightFrom("piece_domino", dt.PIECE_BUTTONS);
    that.chooseDomino();
  });
  this.addListener("piece_eraser", "click", function(event) {
    that.highlightFrom("piece_eraser", dt.PIECE_BUTTONS);
    that.chooseEraser();
  });
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var id = "piece_" + i;
    this.addListener(id, "click",
                     this.makePieceListener(id, dt.USABLE_PIECES[i].type));
  }

  // Direction buttons
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
  this.destroyPieceButtons();
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

dt.LevelController.prototype.chooseEraser = function() {
  this.mode = dt.MODE_ERASER;
};

dt.LevelController.prototype.choosePieceType = function(pieceType) {
  this.mode = dt.MODE_PIECE;
  this.pieceType = pieceType;
  this.preparePiece();
};

dt.LevelController.prototype.chooseDir = function(dir) {
  this.dir = dir;
  this.preparePiece();
};

dt.LevelController.prototype.preparePiece = function() {
  if (this.mode === dt.MODE_PIECE) {
    this.piece = this.pieceType.create(this.dir, this.params);
  }
};

dt.LevelController.prototype.handleCellClick = function(pos) {
  switch (this.mode) {
  case dt.MODE_DOMINO:
    if (this.level.canAddDomino(pos)) {
      this.level.addDomino(pos);
    }
    break;
    
  case dt.MODE_PIECE:    
    if (this.level.canAddPiece(pos, this.piece)) {
      this.level.addPiece(pos, this.piece);
      this.preparePiece();
    }
    break;

  case dt.MODE_ERASER:
    if (this.level.canRemovePiece(pos)) {
      this.level.removePiece(pos);
    }
    break;

  default:
    util.log("Unknown mode: " + this.mode);
  }
};

dt.LevelController.prototype.update = function(event) {
  if (event.src === this.renderer) {
    if ((event.type === dt.EVENT_CELL_DOWN) && (event.button === dt.BUTTON_LEFT)) {
      // TODO check that we are still in the "layout" mode, not running
      this.handleCellClick(event.pos);
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
