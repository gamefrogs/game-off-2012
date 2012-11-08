"use strict";

dt.LevelRenderer = function(level, viewport, ctx) {
  this.level = level;
  this.level.addObserver(this);
  this.viewport = viewport;
  this.ctx = ctx;

};

dt.LevelRenderer.prototype.init = function() {
  var pos0 = util.getPagePosition(this.viewport);
  this.x0 = pos0.x;
  this.y0 = pos0.y;
  
  this.initListeners();
  
  this.render(this.ctx);
};

dt.LevelRenderer.prototype.destroy = function() {
  this.exitListeners();
  this.level.removeObserver(this);
};

dt.LevelRenderer.prototype.initListeners = function() {
  var that = this;
  this.mouseListener = function(event) {
    that.mouseHandler(event);
  };
  this.viewport.addEventListener("mousemove", this.mouseListener, false);
  this.viewport.addEventListener("mouseout", this.mouseListener, false);
};

dt.LevelRenderer.prototype.exitListeners = function() {
  this.viewport.removeEventListener("mousemove", this.mouseListener, false);
  this.viewport.removeEventListener("mouseout", this.mouseListener, false);
  this.mouseListener = null;
};

dt.LevelRenderer.prototype.render = function(ctx) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var back = this.level.getBackground();
  for (var x = 0; x < back.getWidth(); ++x) {
    for (var y = 0; y < back.getHeight(); ++y) {
      var value = back.getValueXY(x, y);
      var fill = "rgb(0, 0, " + ((+value) * 0x50) + ")";
      dt.LevelRenderer.renderCell(ctx, x, y, fill);
    }
  }
};

// Some drawing constants
dt.RADIUS = 30;
dt.DCX = dt.RADIUS * Math.sqrt(3);
dt.INDENT_DCX = [0, dt.DCX / 2];
dt.DCY = dt.RADIUS * 1.5;
dt.FULL_CIRCLE = 2 * Math.PI;

dt.HX = (dt.RADIUS - 2) * Math.sqrt(3) / 2;
dt.HY = (dt.RADIUS - 2) / 2;

dt.squaredist = function(x0, y0, x1, y1) {
  return ((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0));
};

dt.LevelRenderer.getCellCenter = function(x, y) {
  return new dt.Pos(dt.DCX * x + dt.INDENT_DCX[y % 2],
                    dt.DCY * y);
};

dt.LevelRenderer.renderCell = function(ctx, x, y, fill) {
  ctx.beginPath();
  var center = dt.LevelRenderer.getCellCenter(x, y);
  var cx = center.x;
  var cy = center.y;
  ctx.moveTo(cx + dt.HX, cy + dt.HY);
  ctx.lineTo(cx + dt.HX, cy - dt.HY);
  ctx.lineTo(cx, cy - 2 * dt.HY);
  ctx.lineTo(cx - dt.HX, cy - dt.HY);
  ctx.lineTo(cx - dt.HX, cy + dt.HY);
  ctx.lineTo(cx, cy + 2 * dt.HY);
  ctx.closePath();
  if (fill !== undefined) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.strokeStyle = "#c0c0c0";
  ctx.stroke();
};

// Returns the hex coordinates corresponding to some graphical "mouse" coordinates
dt.LevelRenderer.getHexPosition = function(mx, my) {
  var cy0 = Math.floor(my / dt.DCY);
  var cx0 = Math.floor((mx - dt.INDENT_DCX[cy0 % 2]) / dt.DCX);
  var cx1 = cx0 + 1;
  var cy1 = cy0;
  var cy2 = cy0 + 1;
  var cx2 = cx0 + (cy0 % 2);
  var center0 = dt.LevelRenderer.getCellCenter(cx0, cy0);
  var center1 = dt.LevelRenderer.getCellCenter(cx1, cy1);
  var center2 = dt.LevelRenderer.getCellCenter(cx2, cy2);
  var dist0 = dt.squaredist(mx, my, center0.x, center0.y);
  var dist1 = dt.squaredist(mx, my, center1.x, center1.y);
  var dist2 = dt.squaredist(mx, my, center2.x, center2.y);
  if (dist0 < dist1) {
    if (dist0 < dist2) {
      return new dt.Pos(cx0, cy0);
    }
  } else if (dist1 < dist2) {
    return new dt.Pos(cx1, cy1);
  }
  return new dt.Pos(cx2, cy2);
};

dt.LevelRenderer.prototype.update = function(event) {
  util.log("Renderer update", event);
  this.render(this.ctx);
};

dt.LevelRenderer.prototype.mouseHandler = function(event) {
  this.render(this.ctx);

  if (event.type === "mouseout") {
    return;
  }
  
  var mx = event.clientX + util.windowScrollX() - this.x0;
  var my = event.clientY + util.windowScrollY() - this.y0;

  var hcc = dt.LevelRenderer.getHexPosition(mx, my);
  if (this.level.isInside(hcc)) {
    dt.LevelRenderer.renderCell(this.ctx, hcc.x, hcc.y, "#00ff00");
    var hc = dt.LevelRenderer.getCellCenter(hcc.x, hcc.y);
    var ctx = this.ctx;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(hc.x - 2, hc.y - 2, 5, 5);
  }
};

