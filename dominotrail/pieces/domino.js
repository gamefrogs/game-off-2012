"use strict";

// Some common behaviour of all Domino pieces
dt.BaseDominoPiece = function() {
};
dt.BaseDominoPiece.prototype = new dt.BasePiece("dt.BaseDominoPiece");


dt.BaseDominoPiece.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir);
  this.reset();
};

dt.BaseDominoPiece.prototype.getInputs = function() {
  return this.ins;
};

dt.BaseDominoPiece.prototype.getOutputs = function() {
  return this.outs;
};

dt.BaseDominoPiece.prototype.isActive = function() {
  return this.active;
};

dt.BaseDominoPiece.prototype.isDead = function() {
  return this.fallen;
};

dt.BaseDominoPiece.prototype.receiveInputs = function(inputs) {
  if (!this.fallen  && !this.isFreeze()) {
    this.active = dt.RelPosDir.arrayMatch(this.ins, inputs);
  }
};

dt.BaseDominoPiece.prototype.collectOutputs = function() {
  if (this.active) {
    return this.outs;
  } else {
    return [];
  }
};

dt.BaseDominoPiece.prototype.endStep = function(step) {
  if (this.active && !this.isFreeze()) {
    this.active = false;
    this.fallen = true;
    this.reached = true;
  }
};

dt.BaseDominoPiece.prototype.reset = function() {
  this.active = false;
  this.fallen = false;
  this.reached = false;
  this.rebour1 = this.rebour1Sauv;
  this.rebour2 = this.rebour2Sauv;
};

// Straight: exits on the opposite of the input side
dt.StraightDominoPiece = function() {
};
dt.StraightDominoPiece.prototype = new dt.BaseDominoPiece("dt.StraightDominoPiece");
dt.StraightDominoPiece.defaultLimit = Infinity;

dt.registerPiece(dt.StraightDominoPiece, "Straight", "dt.StraightDominoPiece");

dt.StraightDominoPiece.create = function(dir, params) {
  var piece = new dt.StraightDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.StraightDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir);
  this.ins = [new dt.RelPosDir(dt.HERE, dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, dir.opposite)];
};

dt.StraightDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 1], 1, ratio);
  ctx.restore();
};

// StraightStart
dt.StraightStartPiece = function() {
};
dt.StraightStartPiece.prototype = new dt.StraightDominoPiece();
dt.registerPiece(dt.StraightStartPiece, "Start", "dt.StraightStartPiece");

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
  if (!this.fallen && !this.isFreeze()) {
    this.active = true;
  }
};

dt.StraightStartPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0], 2, ratio);
  ctx.restore();
};

// StraightEnd
dt.StraightEndPiece = function() {
};
dt.StraightEndPiece.prototype = new dt.StraightDominoPiece();
dt.registerPiece(dt.StraightEndPiece, "1-End", "dt.StraightEndPiece");

dt.StraightEndPiece.create = function(dir, params) {
  var piece = new dt.StraightEndPiece();
  piece.init(dir, params);
  return piece;
};

dt.StraightEndPiece.prototype.init = function(dir, params) {
  dt.StraightDominoPiece.prototype.init.call(this, dir, params);
  this.goal = true;
};

dt.StraightEndPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1], 3, ratio);
  ctx.restore();
};

// AnyEnd is a goal piece that accepts input from any direction
dt.AnyEndPiece = function() {
};
dt.AnyEndPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.AnyEndPiece, "x-End", "dt.AnyEndPiece");

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
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = dt.AnyEndPiece.ALL_DIRS;
  this.outs = dt.AnyEndPiece.ALL_DIRS;
  this.goal = true;
};

dt.AnyEndPiece.prototype.receiveInputs = function(inputs) {
  if ((!this.fallen) && (inputs.length > 0) && !this.isFreeze() ) {
    this.active = true;
  }
};

dt.AnyEndPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [2, 2, 2, 2, 2, 2], 3, ratio);
  ctx.restore();
};


// TurnRight: exits just right of the opposite of the input side
dt.TurnRightDominoPiece = function() {
};
dt.TurnRightDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.TurnRightDominoPiece, "R&nbsp;Turn", "dt.TurnRightDominoPiece");


dt.TurnRightDominoPiece.create = function(dir, params) {
  var piece = new dt.TurnRightDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.TurnRightDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite.right)];
};

dt.TurnRightDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 1], 1, ratio);
  ctx.restore();
};

// Turnleft: exits just left of the opposite of the input side
dt.TurnLeftDominoPiece = function() {
};
dt.TurnLeftDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.TurnLeftDominoPiece, "L&nbsp;Turn", "dt.TurnLeftDominoPiece");

dt.TurnLeftDominoPiece.create = function(dir, params) {
  var piece = new dt.TurnLeftDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.TurnLeftDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite.left)];
};

dt.TurnLeftDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 1], 1, ratio);
  ctx.restore();
};

// Balanced right double fork
dt.RForkDominoPiece = function() {
};
dt.RForkDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.RForkDominoPiece, "R&nbsp;Fork", "dt.RForkDominoPiece");

dt.RForkDominoPiece.create = function(dir, params) {
  var piece = new dt.RForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.RForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.right)];
};

dt.RForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 0, 1], 1, ratio);
  ctx.restore();
  
};
// Balanced left double fork
dt.LForkDominoPiece = function() {
};
dt.LForkDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.LForkDominoPiece, "L&nbsp;Fork", "dt.LForkDominoPiece");

dt.LForkDominoPiece.create = function(dir, params) {
  var piece = new dt.LForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.LForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.left)];
};

dt.LForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 2, 2, 0, 0, 1], 1, ratio);
  ctx.restore();
  
};

// Balanced double fork
dt.ForkDominoPiece = function() {
};
dt.ForkDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.ForkDominoPiece, "2-Fork", "dt.ForkDominoPiece");

dt.ForkDominoPiece.create = function(dir, params) {
  var piece = new dt.ForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.ForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite.left),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.right)];
};

dt.ForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 2, 0, 2, 0, 1], 1, ratio);
  ctx.restore();
  
};

// Triple Fork
dt.TriForkDominoPiece = function() {
};
dt.TriForkDominoPiece.prototype = new dt.BaseDominoPiece();
dt.registerPiece(dt.TriForkDominoPiece, "3-Fork", "dt.TriForkDominoPiece");

dt.TriForkDominoPiece.create = function(dir, params) {
  var piece = new dt.TriForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.TriForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.left),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.right)];
};

dt.TriForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  dt.draw_hex(ctx, 0, 0, dt.RADIUS, [0, 0, 0, 0, 0, 0], [0, 2, 2, 2, 0, 1], 1, ratio);
  ctx.restore();
  
};
