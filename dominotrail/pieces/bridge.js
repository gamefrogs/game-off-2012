"use strict";

// Straight: exits on the opposite of the input side
dt.BridgePiece = function() {
};
dt.BridgePiece.prototype = new dt.BasePiece();


dt.BridgePiece.create = function(dir, params) {
  var piece = new dt.BridgePiece();
  piece.init(dir, params);
  return piece;
};

dt.BridgePiece.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir);
  this.ins = [new dt.RelPosDir(dt.HERE, dir)];
  this.outs = [new dt.RelPosDir(dt.HERE, dir.opposite)];
  this.others = [new dt.RelativePos(dir.opposite, 3)];
  this.reset();
};

dt.BridgePiece.prototype.getOtherCells = function() {
  return this.others;
};

dt.BridgePiece.prototype.getInputs = function() {
  return this.ins;
};

dt.BridgePiece.prototype.getOutputs = function() {
  return this.outs;
};

dt.BridgePiece.prototype.isActive = function() {
  return this.active;
};

dt.BridgePiece.prototype.isDead = function() {
  return this.fallen;
};

dt.BridgePiece.prototype.receiveInputs = function(inputs) {
  if (!this.fallen) {
    this.active = dt.RelPosDir.arrayMatch(this.ins, inputs);
  }
};

dt.BridgePiece.prototype.collectOutputs = function() {
  if (this.active) {
    return this.outs;
  } else {
    return [];
  }
};

dt.BridgePiece.prototype.endStep = function(step) {
  if (this.active) {
    this.active = false;
    this.fallen = true;
  }
};

dt.BridgePiece.prototype.reset = function() {
  this.active = false;
  this.fallen = false;
};

dt.BridgePiece.prototype.draw = function(ctx, percent) {
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
  ctx.restore();
  ctx.save();
  ctx.rotate(dt.LevelRenderer.ROTATION[this.ins[0].dir.right.id]);
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

