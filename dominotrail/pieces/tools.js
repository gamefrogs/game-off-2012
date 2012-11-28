"use strict";

// Eraser tool
dt.Eraser = function() {
};
dt.Eraser.prototype = new dt.BasePiece();
dt.registerPiece(dt.Eraser, "Eraser", "dt.Eraser", true);

dt.Eraser.prototype.overlayAlpha = 0.6;

dt.Eraser.create = function(dir, params) {
  var piece = new dt.Eraser();
  piece.init(dir, params);
  return piece;
};

dt.Eraser.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
};

dt.Eraser.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.fillStyle = "#ffff00";
  ctx.fillRect(-15, -15, 31, 31);
  ctx.restore();
};

// Tool used to mark pieces as goals for a level
dt.GoalMode = function() {
};
dt.GoalMode.prototype = new dt.BasePiece();
dt.registerPiece(dt.GoalMode, "GoalMode", "dt.GoalMode", true);

dt.GoalMode.prototype.overlayAlpha = 0.7;

dt.GoalMode.create = function(dir, params) {
  var piece = new dt.GoalMode();
  piece.init(dir, params);
  return piece;
};

dt.GoalMode.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
};

dt.GoalMode.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.fillStyle = "#00ff00";
  ctx.beginPath();
  ctx.moveTo(-7, 15);
  ctx.lineTo(-7, -15);
  ctx.lineTo(8, -7);
  ctx.lineTo(-5, 0);
  ctx.lineTo(-5, 15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

// Tool used to mark pieces as locked
dt.LockMode = function() {
};
dt.LockMode.prototype = new dt.BasePiece();
dt.registerPiece(dt.LockMode, "LockMode", "dt.LockMode", true);

dt.LockMode.prototype.overlayAlpha = 0.7;

dt.LockMode.create = function(dir, params) {
  var piece = new dt.LockMode();
  piece.init(dir, params);
  return piece;
};

dt.LockMode.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
};

dt.LockMode.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.fillStyle = "#ff00ff";
  ctx.fillRect(-10, -3, 21, 18);

  ctx.beginPath();
  ctx.arc(0, -3, 9, 0, Math.PI, true);
  ctx.strokeStyle = "#ff00ff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
};

// Used to show that something is forbidden
dt.Forbidden = function() {
};
dt.Forbidden.prototype = new dt.BasePiece();
dt.registerPiece(dt.Forbidden, "Forbidden", "dt.Forbidden", true);

dt.Forbidden.prototype.overlayAlpha = 0.7;

dt.Forbidden.create = function(dir, params) {
  var piece = new dt.Forbidden();
  piece.init(dir, params);
  return piece;
};

dt.Forbidden.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
};

dt.Forbidden.prototype.draw = function(ctx, percent) {
  ctx.save();
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.arc(0, 0, dt.RADIUS * 0.6, 0, dt.FULL_CIRCLE, false);
  ctx.moveTo(dt.RADIUS * 0.4, dt.RADIUS * 0.1);
  ctx.lineTo(dt.RADIUS * 0.4, -dt.RADIUS * 0.1);
  ctx.lineTo(-dt.RADIUS * 0.4, -dt.RADIUS * 0.1);
  ctx.lineTo(-dt.RADIUS * 0.4, dt.RADIUS * 0.1);
  ctx.fill();
  ctx.restore();
};

// Multi-tool to rotate or delete the current piece
dt.DeleteRotate = function() {
};
dt.DeleteRotate.prototype = new dt.BasePiece();
dt.registerPiece(dt.DeleteRotate, "DeleteRotate", "dt.DeleteRotate", true);

dt.DeleteRotate.prototype.overlayAlpha = 0.8;

dt.DeleteRotate.create = function(dir, params) {
  var piece = new dt.DeleteRotate();
  piece.init(dir, params);
  return piece;
};

dt.DeleteRotate.prototype.init = function(dir, params) {
  dt.BasePiece.prototype.init.call(this, dir, params);
};

dt.DeleteRotate.prototype.draw = function(ctx, percent) {
  ctx.save();

  // Red X for delete
  var xlen = dt.RADIUS * 0.4;
  var xwidth = xlen / 4;
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "#ff0000";
  ctx.beginPath();
  ctx.moveTo(xwidth, xlen);
  ctx.lineTo(xwidth, xwidth);
  ctx.lineTo(xlen, xwidth);
  ctx.lineTo(xlen, -xwidth);
  ctx.lineTo(xwidth, -xwidth);
  ctx.lineTo(xwidth, -xlen);
  ctx.lineTo(-xwidth, -xlen);
  ctx.lineTo(-xwidth, -xwidth);
  ctx.lineTo(-xlen, -xwidth);
  ctx.lineTo(-xlen, xwidth);
  ctx.lineTo(-xwidth, xwidth);
  ctx.lineTo(-xwidth, xlen);
  ctx.closePath();
  ctx.fill();
  
  // Right arrow for right rotate
  var r0 = xlen + 2 * xwidth;
  var r1 = r0 + xwidth;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(r1, 0);
  ctx.arc(0, 0, r1, 0, -Math.PI/2, true);
  ctx.lineTo(0, r0);
  ctx.arc(0, 0, r0, -Math.PI/2, 0, false);
  ctx.lineTo(r0 - xwidth, 0);
  ctx.lineTo((r0 + r1) / 2, 3 * xwidth);
  ctx.lineTo(r1 + xwidth, 0);
  ctx.closePath();
  ctx.fill();

  // Left arrow for left rotate
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(-r1, 0);
  ctx.arc(0, 0, r1, Math.PI, Math.PI/2, true);
  ctx.lineTo(0, r0 - xwidth);
  ctx.lineTo(3 * xwidth, (r0 + r1) / 2);
  ctx.lineTo(0, r1 + xwidth);
  ctx.arc(0, 0, r0, Math.PI/2, Math.PI, false);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};
