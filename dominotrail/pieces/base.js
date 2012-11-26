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

dt.registerPiece = function(type, name, typeName, hidden) {
  if (!hidden) {
    dt.USABLE_PIECES.push({type: type, name: name, typeName: typeName});
  }
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
  this.rebour1 = -1;
  this.rebour1Sauv = -1;
  this.rebour2 = -1;
  this.rebour2Sauv = -1;
};

dt.BasePiece.prototype.setRebour1 = function(a){
    this.rebour1 = a;
    this.rebour1Sauv=a;
}

dt.BasePiece.prototype.setRebour2 = function(a){
    this.rebour2 = a;
    this.rebour2Sauv=a;
}

dt.BasePiece.prototype.getBegin = function(){
    return this.rebour2;
}

dt.BasePiece.prototype.getEnd = function(){
    return this.rebour1;
}


dt.BasePiece.prototype.getRebour = function(){
    if ( this.rebour2>0 ){
        return this.rebour2;
    }
    if( this.rebour1>0){
        return this.rebour1;
    }
    return 0;
}

dt.BasePiece.prototype.getBegin = function(){
    return this.rebour2;
}

dt.BasePiece.prototype.getEnd = function(){
    return this.rebour1;
}

dt.BasePiece.prototype.asCompteur = function(){
    return (this.rebour1!=-1 || this.rebour2!=-1 );
}

dt.BasePiece.prototype.isFreeze = function(){
    if( this.rebour1 == 0 || this.rebour2>0 ){
        return true;
    }
    return false;
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
};

// Asks the piece if it's locked
dt.BasePiece.prototype.isLocked = function() {
  return this.locked;
};

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
    if (this.rebour1 > 0 ){
        --this.rebour1;
    }
    if (this.rebour2 > 0 ){
        --this.rebour2;
    }
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

// Default overlay alpha. Some pieces need a different value to be really visible
dt.BasePiece.prototype.overlayAlpha = 0.4;

// Asks the piece its alpha value when drawn as an overlay
dt.BasePiece.prototype.getOverlayAlpha = function() {
  return this.overlayAlpha;
};


////
// When a piece occupies several cells, ghost pieces pointing to the main piece are put into
// all the 'other' cells (those that are not the main cell)
dt.GhostPiece = function(piece, relpos) {
  this.piece = piece;
  this.relpos = relpos;
};

// Mur: no input no output
dt.Wall = function(){
};
dt.Wall.prototype = new dt.BasePiece("dt.Wall");
dt.registerPiece(dt.Wall,"Wall","dt.Wall");

dt.Wall.create = function(dir, params) {
  var piece = new dt.Wall();
  piece.init(dir, params);
  return piece;
};

dt.Wall.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir);
};

dt.Wall.prototype.getInputs = function() {
  return [];
};
dt.Wall.prototype.getOutputs = function() {
  return [];
};

dt.Wall.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.beginPath();
  
  ctx.moveTo(21, 13);
  ctx.lineTo(21, -13);
  ctx.lineTo(0, -24);
  ctx.lineTo(-21, -13);
  ctx.lineTo(-21, 13);
  ctx.lineTo(0, 24);
  ctx.closePath();
  
  ctx.fillStyle = "#008080";
  ctx.fill();
 
  ctx.strokeStyle = "#008080";
  
  ctx.lineWidth = 3;
  ctx.stroke();
  
  ctx.restore();
};
