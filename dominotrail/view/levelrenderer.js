"use strict";

dt.LevelRenderer = function(level, ctx) {
  this.level = level;
  this.level.addObserver(this);
  this.ctx = ctx;

  this.render(this.ctx);
};

dt.LevelRenderer.prototype.destroy = function() {
  this.level.removeObserver(this);
};

dt.LevelRenderer.prototype.render = function(ctx) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var back = this.level.getBackground();
  for (var x = 0; x < back.getWidth(); ++x) {
    for (var y = 0; y < back.getHeight(); ++y) {
      this.renderCell(ctx, x, y);
    }
  }
};

dt.RADIUS = 30;
dt.DCX = dt.RADIUS * Math.sqrt(3);
dt.INDENT_DCX = [0, dt.DCX / 2];
dt.DCY = dt.RADIUS * 1.5;
dt.FULL_CIRCLE = 2 * Math.PI;

dt.HX = (dt.RADIUS - 2) * Math.sqrt(3) / 2;
dt.HY = (dt.RADIUS - 2) / 2;

dt.LevelRenderer.prototype.renderCell = function(ctx, x, y) {
  ctx.beginPath();
  var cx = dt.DCX * x + dt.INDENT_DCX[y % 2];
  var cy = dt.DCY * y;
  ctx.moveTo(cx + dt.HX, cy + dt.HY);
  ctx.lineTo(cx + dt.HX, cy - dt.HY);
  ctx.lineTo(cx, cy - 2 * dt.HY);
  ctx.lineTo(cx - dt.HX, cy - dt.HY);
  ctx.lineTo(cx - dt.HX, cy + dt.HY);
  ctx.lineTo(cx, cy + 2 * dt.HY);
  ctx.closePath();
  ctx.strokeStyle = "#c0c0c0";
  ctx.stroke();
};

dt.LevelRenderer.prototype.update = function(event) {
  util.log("Renderer update", event);
  this.render(this.ctx);
};
