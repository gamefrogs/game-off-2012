"use strict";

dt.MODE_PIECE = "ModePiece";
dt.MODE_ERASER = "ModeEraser";

dt.LevelController = function(round, renderer) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.renderer.addObserver(this);
  this.round.addObserver(this);
  this.level.addObserver(this);

  this.pieceButtons = [];
  this.counters = {};
  this.initListeners();
  
  this.mode = dt.MODE_DOMINO; 
  this.params = {};

  this.dir = dt.Dir.E;
  this.highlightFrom("piece_0", this.pieceButtons);
  this.choosePieceType(this.getUsablePieces()[0].type);
};

dt.LevelController.prototype.createPieceButton = function(id, label, limit, typeName) {
  var panel = document.getElementById("piece_buttons");
  panel.innerHTML += ('<span id="' + id + '" class="sbutton">' + label + '</span>' +
                      '<span id="limit_' + id + '" class="limit">' + limit + '</span>' +
                      '<br>');
  if (typeName !== undefined) {
    this.counters[typeName] = "limit_" + id;
  }
};

dt.LevelController.prototype.destroyPieceButtons = function() {
  var panel = document.getElementById("piece_buttons");
  panel.innerHTML = "";
};

dt.LevelController.prototype.makePieceListener = function(id, pieceType) {
  var that = this;
  return function(event) {
    that.highlightFrom(id, that.pieceButtons);
    that.choosePieceType(pieceType);
  }
};

dt.LevelController.prototype.getUsablePieces = function() {
  var pieces = [];
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var piece = dt.USABLE_PIECES[i];
    var limit = this.level.getLimitForPiece(piece.type);
    if (limit > 0) {
      pieces.push(piece);
    }
  }
  return pieces;
};

dt.LevelController.prototype.initListeners = function() {
  var that = this;
  this.eventListeners = [];
  // Create all buttons in HTML before attaching listeners
  this.pieceButtons.push("piece_eraser");
  this.createPieceButton("piece_eraser", "Erase", Infinity);

  var usablePieces = this.getUsablePieces();
  
  for (var i = 0; i < usablePieces.length; ++i) {
    var piece = usablePieces[i];
    var id = "piece_" + i;
    this.pieceButtons.push(id);
    this.createPieceButton(id, piece.name, this.level.getLimitForPiece(piece.type),
                          piece.type.prototype.typeName);
  }

  this.addListener("piece_eraser", "click", function(event) {
    that.highlightFrom("piece_eraser", that.pieceButtons);
    that.chooseEraser();
  });
  for (var i = 0; i < usablePieces.length; ++i) {
    var id = "piece_" + i;
    this.addListener(id, "click",
                     this.makePieceListener(id, usablePieces[i].type));
  }
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
  this.level.removeObserver(this);
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
  if (this.isRoundRunning()) {
    return;
  }
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

dt.LevelController.prototype.fullRender = function(pos, percent) {
  this.renderer.render(percent);
  if ((pos !== undefined) && (this.round.status === dt.ROUND_NOT_RUN)) {
    this.renderer.renderOverlay(pos, this.piece);
  }
};

dt.LevelController.prototype.isRoundRunning = function() {
  return this.round.status !== dt.ROUND_NOT_RUN;
};

dt.LevelController.prototype.handleCellRightClick = function(pos) {
  if (this.isRoundRunning()) {
    return;
  }
  if (this.mode === dt.MODE_PIECE) {
    this.chooseDir(this.dir.right);
    this.fullRender(pos);
  }
};

dt.LevelController.prototype.handleCellOver = function(pos) {
  if (this.isRoundRunning()) {
    return;
  }
  if (!this.level.isInside(pos)) {
    return;
  }
  if ((this.mode === dt.MODE_PIECE) && (this.level.canAddPiece(pos, this.piece))) {
    this.fullRender(pos);
    return;
  }
  var canAdd = this.level.canAddDomino(pos);
  var borderColor = (canAdd ? "#000000" : "#ff0000");
  this.renderer.render();
  this.renderer.renderCellBackground(pos.x, pos.y, undefined, borderColor, 2);
  if (!canAdd) {
    var ctx = this.renderer.ctx;
    var hc = this.renderer.getCellCenter(pos.x, pos.y);
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(hc.x, hc.y, dt.RADIUS * 0.6, 0, dt.FULL_CIRCLE, false);
    ctx.fill();
    ctx.restore();
  }
};

dt.LevelController.prototype.handleCellOut = function(pos) {
  if (this.isRoundRunning()) {
    return;
  }
  this.fullRender();
};

dt.LevelController.prototype.update = function(event) {
  if (event.src === this.renderer) {
    if (event.type === dt.EVENT_CELL_DOWN) {
      if (event.button === dt.BUTTON_LEFT) {
        this.handleCellClick(event.pos);
      } else if (event.button === dt.BUTTON_RIGHT) {
        this.handleCellRightClick(event.pos);
      } else { 
        util.log("LevelController received other click ", event);
      }
      
    } else if (event.type === dt.EVENT_CELL_OVER) {
      this.handleCellOver(event.pos);
      
    } else if (event.type === dt.EVENT_CELL_OUT) {
      this.handleCellOut();
      
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
    
  } else if (event.src === this.level) {
    if (event.type === dt.EVENT_LIMIT_CHANGE) {
      this.changeCounter(event.typeName, event.to);
    }
    
  } else {
    util.log("LevelController received ", event);
  }
};

dt.LevelController.prototype.changeCounter = function(typeName, value) {
  var counter = document.getElementById(this.counters[typeName]);
  counter.innerHTML = "" + value;
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
      that.round.runStepFirstHalf();
      anim = 0;
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
