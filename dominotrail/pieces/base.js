"use strict";

// The base structure for a piece.
// For now, the constraints are:
//  - a piece can occupy several cells
//  - a piece can receive input from cells with directions
//  - a piece can have consequences on a list of cells with directions
dt.BasePiece = function() {
};

// Drawing units
dt.RADIUS = 30;
dt.DCX = dt.RADIUS * Math.sqrt(3);
dt.INDENT_DCX = [0, dt.DCX / 2];
dt.DCY = dt.RADIUS * 1.5;
dt.HX = (dt.RADIUS - 2) * Math.sqrt(3) / 2;
dt.HY = (dt.RADIUS - 2) / 2;


dt.USABLE_PIECES = [];
dt.PIECE_TYPE_BY_NAME = {};

dt.registerPiece = function(type, name, typeName) {
  dt.USABLE_PIECES.push({type: type, name: name, typeName: typeName});
  type.prototype.typeName = typeName;
  dt.PIECE_TYPE_BY_NAME[typeName] = type;
};


//==================================================================
//
// Here start the interface that should be extended by real pieces.
//
//==================================================================

// 0. Factory and init functions
//-------------------------------

// Must create an instance of the right class and call its init method with direction and all
//  possible params
dt.BasePiece.create = function(dir, params) {
  var piece = new dt.BasePiece();
  piece.init(dir, params);
  return piece;
};

// Initializes the instance, like a constructor. Call the base class init().
dt.BasePiece.prototype.init = function(dir, params) {
  this.dir = dir;
  this.locked = false;
  this.goal = false;
  this.reached = false;
};

dt.BasePiece.prototype.param = function(params, name, defaultValue) {
  if (params && (name in params)) {
    return params[name];
  } else {
    return defaultValue
  }
};


// 1. Static part used when laying out the level
//-----------------------------------------------

// Asks a piece if it's a goal of the level
dt.BasePiece.prototype.isGoal = function() {
  return this.goal;
};

// Asks the piece, when it's a goal, if it has been reached
dt.BasePiece.prototype.isGoalReached = function() {
  return this.reached;
}

// Must return an array of dt.RelativePos that are part of this piece, except the main position
// dt.HERE is implicit
// Pieces that fit in one cell return an empty array
dt.BasePiece.prototype.getOtherCells = function() {
  return [];
};

// Must return the list of (relative position + direction) that accept input
dt.BasePiece.prototype.getInputs = function() {
  return [];
};

// Must return the list of (relative position + direction) that produce output
dt.BasePiece.prototype.getOutputs = function() {
  return [];
};


// 2. Dynamic part used then the round is run
//--------------------------------------------

// Notifies the piece that the round just started running
dt.BasePiece.prototype.startRound = function() {
};

// Asks the piece if it is active during this round
dt.BasePiece.prototype.isActive = function() {
  return false;
};

// Asks if the piece can activate still itself automatically in the future (to detect end
// of round).
dt.BasePiece.prototype.canAutoActivate = function(step) {
  return false;
};

// Notifies the piece that a step is starting
dt.BasePiece.prototype.startStep = function(step) {
};

// Notifies the piece that it just received input from a list of (position + direction)
dt.BasePiece.prototype.receiveInputs = function(inputs) {
};

// Asks the piece to run its action for the step
dt.BasePiece.prototype.runStep = function(step) {
};

// Asks the piece the list of (position + direction) that produce outputs this step
dt.BasePiece.prototype.collectOutputs = function() {
  return [];
};

// Notifies the piece that a step is finished
dt.BasePiece.prototype.endStep = function(step) {
};

// Asks the piece to reset itself (to return to lay out mode)
dt.BasePiece.prototype.reset = function() {
};

// 3. Drawing part
//-----------------

// Asks the piece to draw itself at a given percentage of progress (inside the current step)
dt.BasePiece.prototype.draw = function(ctx, percent) {
};


////
// When a piece occupies several cells, ghost pieces pointing to the main piece are put into
// all the 'other' cells (those that are not the main cell)
dt.GhostPiece = function(piece, relpos) {
  this.piece = piece;
  this.relpos = relpos;
};