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

// Some common behaviour of all Domino pieces
dt.BaseDominoPiece = function() {
};
dt.BaseDominoPiece.prototype = new dt.BasePiece();


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
  if (!this.fallen) {
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
  if (this.active) {
    this.active = false;
    this.fallen = true;
  }
};

dt.BaseDominoPiece.prototype.reset = function() {
  this.active = false;
  this.fallen = false;
};

// Straight: exits on the opposite of the input side
dt.StraightDominoPiece = function() {
};
dt.StraightDominoPiece.prototype = new dt.BaseDominoPiece();


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
dt.AnyEndPiece.prototype = new dt.BaseDominoPiece();

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
};

dt.AnyEndPiece.prototype.isGoal = function() {
  return true;
};

dt.AnyEndPiece.prototype.isGoalReached = function() {
  return this.fallen;
};

dt.AnyEndPiece.prototype.receiveInputs = function(inputs) {
  if ((!this.fallen) && (inputs.length > 0)) {
    this.active = true;
  }
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

  var ratio = 0;
  if (this.fallen) {
    ratio = 1;
  } else if (this.active) {
    ratio = percent / 100;
  }
  if (ratio !== 0) {
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (var angle = -Math.PI; angle <= Math.PI; angle += Math.PI / 6) {
      ctx.moveTo(0, 0);
      ctx.lineTo(ratio * dt.RADIUS * Math.cos(angle), ratio * dt.RADIUS * Math.sin(angle));
    }
    ctx.stroke();
  }

};


// TurnRight: exits just right of the opposite of the input side
dt.TurnRightDominoPiece = function() {
};
dt.TurnRightDominoPiece.prototype = new dt.BaseDominoPiece();

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
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);

  ctx.rotate(Math.PI / 6);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(1, -9, 5, 19);

  ctx.rotate(Math.PI / 6);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  
  ctx.restore();
};

// Turnleft: exits just left of the opposite of the input side
dt.TurnLeftDominoPiece = function() {
};
dt.TurnLeftDominoPiece.prototype = new dt.BaseDominoPiece();

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
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);

  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(1, -9, 5, 19);

  ctx.rotate(-Math.PI / 6);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  
  ctx.restore();
};

// Balanced right double fork
dt.RForkDominoPiece = function() {
};
dt.RForkDominoPiece.prototype = new dt.BaseDominoPiece();

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

  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);
  ctx.fillRect(1, -9, 5, 19);

 
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  ctx.rotate( Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);
  ctx.restore();

  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  ctx.restore();
};
// Balanced left double fork
dt.LForkDominoPiece = function() {
};
dt.LForkDominoPiece.prototype = new dt.BaseDominoPiece();

dt.LForkDominoPiece.create = function(dir, params) {
  var piece = new dt.LForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.LForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite.left),
               new dt.RelPosDir(dt.HERE, this.dir.opposite)];
};

dt.LForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);
  ctx.fillRect(1, -9, 5, 19);

  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  ctx.rotate(-Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);
  ctx.restore();

  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  ctx.restore();
};

// Balanced double fork
dt.ForkDominoPiece = function() {
};
dt.ForkDominoPiece.prototype = new dt.BaseDominoPiece();

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
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);
  ctx.fillRect(1, -9, 5, 19);

  ctx.rotate(-Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  ctx.rotate(2 * Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);
  ctx.restore();

  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  ctx.restore();
};

// TODO add right and left double fork

// Triple Fork
dt.TriForkDominoPiece = function() {
};
dt.TriForkDominoPiece.prototype = new dt.BaseDominoPiece();

dt.TriForkDominoPiece.create = function(dir, params) {
  var piece = new dt.TriForkDominoPiece();
  piece.init(dir, params);
  return piece;
};

dt.TriForkDominoPiece.prototype.init = function(dir, params) {
  dt.BaseDominoPiece.prototype.init.call(this, dir, params);
  this.ins = [new dt.RelPosDir(dt.HERE, this.dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, this.dir.opposite.left),
               new dt.RelPosDir(dt.HERE, this.dir.opposite),
               new dt.RelPosDir(dt.HERE, this.dir.opposite.right)];
};

dt.TriForkDominoPiece.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-20, -9, 6, 19);
  ctx.fillRect(-5, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-14, -9, 5, 19);
  ctx.fillRect(1, -9, 5, 19);

  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);
  
  ctx.rotate(-Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);

  ctx.rotate(2 * Math.PI / 3);
  ctx.fillStyle = "#000000";
  ctx.fillRect(10, -9, 6, 19);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(16, -9, 5, 19);
  ctx.restore();

  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.id]);
  var ratio = (this.fallen ? 1 :
               this.active ? (percent / 100) :
               0);
  ctx.fillStyle = "#000000";
  ctx.fillRect(-dt.RADIUS, -dt.RADIUS / 3, dt.RADIUS * 2 * ratio, 2 * dt.RADIUS / 3);
  ctx.restore();
};
