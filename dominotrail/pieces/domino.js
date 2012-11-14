"use strict";

// DeadEnd: does not exit
dt.DeadEndDominoPiece = function() {
};

util.extend(dt.BasePiece, dt.DeadEndDominoPiece);

dt.DeadEndDominoPiece.create = function(dir, params) {
  var piece = new dt.DeadEndDominoPiece();
  dt.BasePiece.init.call(piece, dir);
  return piece;
};

dt.DeadEndDominoPiece.prototype.getInputs = function() {
  return [{pos: dt.HERE, dir: this.dir}];
};

dt.DeadEndDominoPiece.prototype.receiveInputs = function(inputs) {
};

// Straight: exits on the opposite of the input side
dt.StraightDominoPiece = function() {
};
dt.StraightDominoPiece.prototype = new dt.BasePiece();


dt.StraightDominoPiece.create = function(dir, params) {
  var piece = new dt.StraightDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.StraightDominoPiece.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir);
  this.ins = [new dt.RelPosDir(dt.HERE, dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, dir.opposite)];
  this.reset();
};

dt.StraightDominoPiece.prototype.getInputs = function() {
  return this.ins;
};

dt.StraightDominoPiece.prototype.getOutputs = function() {
  return this.outs;
};

dt.StraightDominoPiece.prototype.isActive = function() {
  return this.active;
};

dt.StraightDominoPiece.prototype.isDead = function() {
  return this.fallen;
};

dt.StraightDominoPiece.prototype.receiveInputs = function(inputs) {
  if (!this.fallen) {
    this.active = dt.RelPosDir.arrayMatch(this.ins, inputs);
  }
};

dt.StraightDominoPiece.prototype.collectOutputs = function() {
  if (this.active) {
    return this.outs;
  } else {
    return [];
  }
};

dt.StraightDominoPiece.prototype.endStep = function(step) {
  if (this.active) {
    this.active = false;
    this.fallen = true;
  }
};

dt.StraightDominoPiece.prototype.reset = function() {
  this.active = false;
  this.fallen = false;
};

dt.StraightDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);
  ctx.fillRect(1, -9, 5, 19);
  ctx.fillRect(16, -9, 5, 19);

  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  
  ctx.restore();
};

// StraightStart
dt.StraightStartPiece = function() {
};
dt.StraightStartPiece.prototype = new dt.StraightDominoPiece();

dt.StraightStartPiece.create = function(dir, params) {
  var piece = new dt.StraightStartPiece();
  piece.init(dir, params);
  return piece;
};

dt.StraightStartPiece.prototype.init = function(dir, params) {
  dt.StraightDominoPiece.prototype.init.call(this, dir, params);
  this.startAt = this.param(params, "startAt", 0);
};

dt.StraightStartPiece.prototype.getInputs = function() {
  return [];
};

dt.StraightStartPiece.prototype.canAutoActivate = function(step) {
  return step <= this.startAt;
};

dt.StraightStartPiece.prototype.receiveInputs = function(inputs) {
  if (!this.fallen) {
    this.active = true;
  }
};

dt.StraightStartPiece.prototype.draw = function(ctx, percent) {
  dt.StraightDominoPiece.prototype.draw.call(this, ctx, percent);
  
  ctx.save();
  ctx.strokeStyle = "#00c000";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, dt.RADIUS * 0.75, 0, dt.FULL_CIRCLE, false);
  ctx.stroke();
  ctx.restore();
};

// StraightEnd
dt.StraightEndPiece = function() {
};
dt.StraightEndPiece.prototype = new dt.StraightDominoPiece();

dt.StraightEndPiece.create = function(dir, params) {
  var piece = new dt.StraightEndPiece();
  piece.init(dir, params);
  return piece;
};

dt.StraightEndPiece.prototype.init = function(dir, params) {
  dt.StraightDominoPiece.prototype.init.call(this, dir, params);
};

dt.StraightEndPiece.prototype.draw = function(ctx, percent) {
  dt.StraightDominoPiece.prototype.draw.call(this, ctx, percent);
  
  ctx.save();
  ctx.strokeStyle = "#000080";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, dt.RADIUS * 0.75, 0, dt.FULL_CIRCLE, false);
  ctx.stroke();
  ctx.restore();
};

// AnyEnd is a goal piece that accepts input from any direction
dt.AnyEndPiece = function() {
};
dt.AnyEndPiece.prototype = new dt.BasePiece();

dt.AnyEndPiece.create = function(dir, params) {
  var piece = new dt.AnyEndPiece();
  piece.init(dir, params);
  return piece;
};

dt.AnyEndPiece.ALL_DIRS = [ new dt.RelPosDir(dt.HERE, dt.Dir.E),
                            new dt.RelPosDir(dt.HERE, dt.Dir.SE),
                            new dt.RelPosDir(dt.HERE, dt.Dir.SW),
                            new dt.RelPosDir(dt.HERE, dt.Dir.W),
                            new dt.RelPosDir(dt.HERE, dt.Dir.NW),
                            new dt.RelPosDir(dt.HERE, dt.Dir.NE) ];

dt.AnyEndPiece.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
  this.reset();
};

dt.AnyEndPiece.prototype.getInputs = function() {
  return dt.AnyEndPiece.ALL_DIRS;
};

dt.AnyEndPiece.prototype.getOutputs = function() {
  return dt.AnyEndPiece.ALL_DIRS;
};

dt.AnyEndPiece.prototype.receiveInputs = function(inputs) {
  if ((!this.fallen) && (inputs.length > 0)) {
    this.active = true;
  }
};

dt.AnyEndPiece.prototype.collectOutputs = function() {
  if (this.active) {
    return dt.AnyEndPiece.ALL_DIRS;
  } else {
    return [];
  }
};

dt.AnyEndPiece.prototype.endStep = function(step) {
  if (this.active) {
    this.active = false;
    this.fallen = true;
  }
};

dt.AnyEndPiece.prototype.isActive = function() {
  return this.active;
};

dt.AnyEndPiece.prototype.isDead = function() {
  return this.fallen;
};

dt.AnyEndPiece.prototype.reset = function() {
  this.active = false;
  this.fallen = false;
};

dt.AnyEndPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.strokeStyle = "#000080";
  ctx.fillStyle = "#000080";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, dt.RADIUS * 0.75, 0, dt.FULL_CIRCLE, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, dt.RADIUS * 0.5, 0, dt.FULL_CIRCLE, false);
  ctx.fill();
  ctx.restore();
  
  if (this.fallen) {
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (var angle = -Math.PI; angle <= Math.PI; angle += Math.PI / 6) {
      ctx.moveTo(0, 0);
      ctx.lineTo(dt.RADIUS * Math.cos(angle), dt.RADIUS * Math.sin(angle));
    }
    ctx.stroke();
  }

};


// TurnRight: exits just right of the opposite of the input side
dt.TurnRightDominoPiece = function() {
};

util.extend(dt.BasePiece, dt.TurnRightDominoPiece);

dt.TurnRightDominoPiece.create = function(dir, params) {
  var piece = new dt.TurnRightDominoPiece();
  dt.BasePiece.init.call(piece, dir);
  return piece;
};

dt.TurnRightDominoPiece.prototype.getOtherCells = function() {
  return [];
};

dt.TurnRightDominoPiece.prototype.getInputs = function() {
  return [{pos: dt.HERE, dir: this.dir}];
};

dt.TurnRightDominoPiece.prototype.getOutputs = function() {
  return [{pos: dt.HERE, dir: this.dir.opposite.right}];
};

// TurnLeft: exits just left of the opposite of the input side
dt.TurnLeftDominoPiece = function() {
};

util.extend(dt.BasePiece, dt.TurnLeftDominoPiece);

dt.TurnLeftDominoPiece.create = function(dir, params) {
  var piece = new dt.TurnLeftDominoPiece();
  dt.BasePiece.init.call(piece, dir);
  return piece;
};

dt.TurnLeftDominoPiece.prototype.getOtherCells = function() {
  return [];
};

dt.TurnLeftDominoPiece.prototype.getInputs = function() {
  return [{pos: dt.HERE, dir: this.dir}];
};

dt.TurnLeftDominoPiece.prototype.getOutputs = function() {
  return [{pos: dt.HERE, dir: this.dir.opposite.left}];
};


// TODO add double and triple forks