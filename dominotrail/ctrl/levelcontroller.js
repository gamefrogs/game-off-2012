"use strict";

dt.MODE_PIECE = "ModePiece";
dt.MODE_ERASER = "ModeEraser";
dt.MODE_GOAL = "ModeGoal";
dt.MODE_LOCK = "ModeLock";

dt.LevelController = function(round, renderer, selector) {
  this.round = round;
  this.level = round.level;
  this.renderer = renderer;
  this.selector = selector;
  this.renderer.addObserver(this);
  this.selector.addObserver(this);
  this.round.addObserver(this);
  this.level.addObserver(this);

  this.pieceButtons = [];
  this.counters = {};
  this.initListeners();
  
  this.mode = dt.MODE_DOMINO; 
  this.params = {};

  this.overPos = undefined;
  this.dir = dt.Dir.W;
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

  var usablePieces = this.getUsablePieces();
  
  // Show or hide the "editor" div
  var editorPane = document.getElementById("editor_pane");
  var titleInput = document.getElementById("level_title");
  var save = document.getElementById("level_save");
  var source = document.getElementById("level_source");
  if (this.level.designMode) {
    editorPane.style.display = "inline-block";
    save.addEventListener("click", function(event) {
      var src = that.level.generateSource(titleInput.value);
      source.value = src;
    }, false);
  } else {
    editorPane.style.display = "none";
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
  this.closeInfo();
  this.exitListeners();
  this.destroyPieceButtons();
  this.level.removeObserver(this);
  this.round.removeObserver(this);
  this.selector.removeObserver(this);
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

dt.LevelController.prototype.chooseGoal = function() {
  this.mode = dt.MODE_GOAL;
};

dt.LevelController.prototype.chooseLock = function() {
  this.mode = dt.MODE_LOCK;
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

dt.LevelController.prototype.tryAddPiece = function(pos) {
  if (this.level.canAddPiece(pos, this.piece)) {
    this.level.addPiece(pos, this.piece);
    var outs = this.piece.getOutputs();
    if (outs.length > 0) {
      this.dir = outs[0].dir.opposite;
    }
    this.preparePiece();
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
    this.tryAddPiece(pos);
    break;

  case dt.MODE_ERASER:
    if (this.level.canRemovePiece(pos)) {
      this.level.removePiece(pos);
      this.fullRender(this.overPos);
    }
    break;

  case dt.MODE_GOAL:
    if (this.level.getObject(pos) instanceof dt.BasePiece) {
      var piece = this.level.getObject(pos);
      piece.goal = !piece.isGoal();
    }
    break;

  case dt.MODE_LOCK:
    if (this.level.getObject(pos) instanceof dt.BasePiece) {
      var piece = this.level.getObject(pos);
      piece.locked = !piece.isLocked();
    }
    break;

  default:
    util.log("Unknown mode: " + this.mode);
  }
};

dt.LevelController.prototype.fullRender = function(pos, percent) {
  this.renderer.render(percent);
  if (pos !== undefined) {
    if ((this.round.status === dt.ROUND_NOT_RUN) &&
        (this.level.canAddPiece(pos, this.piece))) {
    
      this.renderer.renderOverlay(pos, this.piece);
      
    } else {
      this.renderer.renderOverlay(pos, dt.Forbidden.create(dt.Dir.NONE));
    }
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
    this.overPos = undefined;
    return;
  }
  this.overPos = pos;
  this.fullRender(pos);
};

dt.LevelController.prototype.handleCellOut = function(pos) {
  if (this.isRoundRunning()) {
    return;
  }
  this.overPos = undefined;
  this.fullRender();
};

dt.LevelController.prototype.closeInfo = function() {
  if (this.closeInfoListener !== undefined) {
    var info = document.getElementById("information");
    info.style.display = "none";
    var infoClose = document.getElementById("info_close");
    infoClose.removeEventListener("click", this.closeInfoListener, false);
    this.closeInfoListener = undefined;
  }
};

dt.LevelController.prototype.displayLevelInfo = function() {
  if (this.level.getInformation() === undefined) {
    return;
  }
  
  var info = document.getElementById("information");
  info.style.display = "block";
  var infoClose = document.getElementById("info_close");
  var that = this;
  this.closeInfoListener = function(event) {
    that.closeInfo();
  };
  infoClose.addEventListener("click", this.closeInfoListener, false);

  var infoTitle = document.getElementById("info_title");
  infoTitle.innerHTML = this.level.getTitle();
  var infoContent = document.getElementById("info_content");
  infoContent.innerHTML = this.level.getInformation();
};

dt.LevelController.prototype.update = function(event) {
  if (event.src === this.renderer) {
    if (event.type === dt.EVENT_CELL_DOWN) {
      if (event.button === dt.BUTTON_LEFT) {
        this.closeInfo();
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
    
  } else if (event.src === this.selector) {
    if (event.type === dt.EVENT_PIECE_SELECTED) {
      var pieceType = dt.PIECE_TYPE_BY_NAME[event.typeName];
      this.choosePieceType(pieceType);
      if (pieceType === dt.Eraser) {
        this.chooseEraser();
      } else if (pieceType === dt.GoalMode) {
        this.chooseGoal();
      } else if (pieceType === dt.LockMode) {
        this.chooseLock();
      }

      this.fullRender(this.overPos);
      
    } else if (event.type === dt.EVENT_ROTATE_RIGHT) {
      this.chooseDir(this.dir.right);
      this.fullRender(this.overPos);
      
    } else if (event.type === dt.EVENT_ROTATE_LEFT) {
      this.chooseDir(this.dir.left);
      this.fullRender(this.overPos);
      
    }    
  } else {
    util.log("LevelController received ", event);
  }
};

dt.LevelController.prototype.runRound = function() {
  var DELAY = 30;
  var ANIM_STEP = 10;
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
