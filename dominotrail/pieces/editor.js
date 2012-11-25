"use strict";

// Tool used to mark pieces as goals for a level
dt.GoalMode = function() {
};
dt.GoalMode.prototype = new dt.BasePiece();
dt.registerPiece(dt.GoalMode, "GoalMode", "dt.GoalMode", true);

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
