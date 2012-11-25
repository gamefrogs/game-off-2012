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
