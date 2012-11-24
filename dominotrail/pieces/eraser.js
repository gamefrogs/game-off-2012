"use strict";

dt.Eraser = function() {
};
dt.Eraser.prototype = new dt.BasePiece();
dt.registerPiece(dt.Eraser, "Eraser", "dt.Eraser", true);

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
