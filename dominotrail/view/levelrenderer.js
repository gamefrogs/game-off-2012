"use strict";

dt.EVENT_CELL_DOWN = "CellDown";
dt.EVENT_CELL_UP = "CellUp";

dt.BUTTON_LEFT = "ButtonLeft";
dt.BUTTON_RIGHT = "ButtonRight";
dt.BUTTON_MIDDLE = "ButtonMiddle";

dt.BUTTON_MAPPING = [ dt.BUTTON_LEFT, dt.BUTTON_MIDDLE, dt.BUTTON_RIGHT ];

dt.LevelRenderer = function(level, viewport, ctx, radius) {
  this.level = level;
  this.level.addObserver(this);
  this.viewport = viewport;
  this.ctx = ctx;

  // Some drawing constants
  this.RADIUS = radius || 30;
  this.DCX = this.RADIUS * Math.sqrt(3);
  this.INDENT_DCX = [0, this.DCX / 2];
  this.DCY = this.RADIUS * 1.5;
  
  this.HX = (this.RADIUS - 2) * Math.sqrt(3) / 2;
  this.HY = (this.RADIUS - 2) / 2;
};

util.extend(util.Observable, dt.LevelRenderer);

dt.LevelRenderer.BACKGROUND_COLOR = ["#000000", "#00ffff", "#0000ff", "#008000", "#c09060"];

dt.LevelRenderer.ROTATION = [];
dt.LevelRenderer.ROTATION[dt.Dir.E.id] = Math.PI;
dt.LevelRenderer.ROTATION[dt.Dir.SE.id] = -2 * Math.PI / 3;
dt.LevelRenderer.ROTATION[dt.Dir.SW.id] = -Math.PI / 3;
dt.LevelRenderer.ROTATION[dt.Dir.W.id] = 0;
dt.LevelRenderer.ROTATION[dt.Dir.NW.id] = Math.PI / 3;
dt.LevelRenderer.ROTATION[dt.Dir.NE.id] = 2 * Math.PI / 3;

dt.LevelRenderer.prototype.init = function() {
  var pos0 = util.getPagePosition(this.viewport);
  this.x0 = pos0.x;
  this.y0 = pos0.y;
  
  this.initListeners();
  
  this.render();
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
  this.viewport.addEventListener("mousedown", this.mouseListener, false);
  this.viewport.addEventListener("mouseup", this.mouseListener, false);
};

dt.LevelRenderer.prototype.exitListeners = function() {
  this.viewport.removeEventListener("mousemove", this.mouseListener, false);
  this.viewport.removeEventListener("mouseout", this.mouseListener, false);
  this.viewport.removeEventListener("mousedown", this.mouseListener, false);
  this.viewport.removeEventListener("mouseup", this.mouseListener, false);
  this.mouseListener = null;
};

dt.LevelRenderer.prototype.getBackground = function(value) {
  return dt.LevelRenderer.BACKGROUND_COLOR[value];
};

dt.LevelRenderer.prototype.render = function() {
  var ctx = this.ctx;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var back = this.level.getBackground();
  for (var x = 0; x < back.getWidth(); ++x) {
    for (var y = 0; y < back.getHeight(); ++y) {
      var value = back.getValueXY(x, y);
      var fill = this.getBackground(value);
      this.renderCellBackground(x, y, fill, "#c0c0c0");

      this.renderCellContent(x, y);
    }
  }
};

dt.squaredist = function(x0, y0, x1, y1) {
  return ((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0));
};

dt.LevelRenderer.prototype.getCellCenter = function(x, y) {
  return new dt.Pos(this.DCX * x + this.INDENT_DCX[y % 2],
                    this.DCY * y);
};

dt.LevelRenderer.prototype.renderCellBackground = function(x, y, fill, stroke, width) {
  var ctx = this.ctx;
  ctx.save();
  ctx.beginPath();
  var center = this.getCellCenter(x, y);
  var cx = center.x;
  var cy = center.y;
  ctx.moveTo(cx + this.HX, cy + this.HY);
  ctx.lineTo(cx + this.HX, cy - this.HY);
  ctx.lineTo(cx, cy - 2 * this.HY);
  ctx.lineTo(cx - this.HX, cy - this.HY);
  ctx.lineTo(cx - this.HX, cy + this.HY);
  ctx.lineTo(cx, cy + 2 * this.HY);
  ctx.closePath();
  if (fill !== undefined) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke !== undefined) {
    ctx.strokeStyle = stroke;
    if (width !== undefined) {
      ctx.lineWidth = width;
    }
    ctx.stroke();
  }
  ctx.restore();
};

dt.FULL_CIRCLE = 2 * Math.PI;

dt.LevelRenderer.prototype.renderCellContent = function(x, y) {
  var ctx = this.ctx;
  var obj = this.level.getObjectXY(x, y);
  if (obj !== undefined) {
    var hc = this.getCellCenter(x, y);
    if (obj.type === dt.TILE_DOMINO) {
      ctx.save();

      if (obj.start) {
        ctx.strokeStyle = "#00c000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(hc.x, hc.y, this.RADIUS * 0.75, 0, dt.FULL_CIRCLE, false);
        ctx.stroke();
      }
      
      ctx.translate(hc.x, hc.y);
      ctx.scale(this.RADIUS / 30, this.RADIUS / 30); // Domino size is based on 30 pixels
      ctx.rotate(dt.LevelRenderer.ROTATION[obj.src.id]);
      ctx.fillStyle = "#000000";
      ctx.fillRect(-5, -9, 6, 19);
      ctx.fillRect(-20, -9, 6, 19);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(1, -9, 5, 19);
      ctx.fillRect(-14, -9, 5, 19);
      ctx.restore();
    }
  }
};

// Returns the hex coordinates corresponding to some graphical "mouse" coordinates
dt.LevelRenderer.prototype.getHexPosition = function(mx, my) {
  var cy0 = Math.floor(my / this.DCY);
  var cx0 = Math.floor((mx - this.INDENT_DCX[cy0 % 2]) / this.DCX);
  var cx1 = cx0 + 1;
  var cy1 = cy0;
  var cy2 = cy0 + 1;
  var cx2 = cx0 + (cy0 % 2);
  var center0 = this.getCellCenter(cx0, cy0);
  var center1 = this.getCellCenter(cx1, cy1);
  var center2 = this.getCellCenter(cx2, cy2);
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
  this.render();
};

dt.LevelRenderer.prototype.mouseHandler = function(event) {
  this.render();

  if (event.type === "mouseout") {
    return;
  }
  
  var mx = event.clientX + util.windowScrollX() - this.x0;
  var my = event.clientY + util.windowScrollY() - this.y0;

  var hcc = this.getHexPosition(mx, my);
  if (this.level.isInside(hcc)) {
    this.renderCellBackground(hcc.x, hcc.y, undefined, "#000000", 2);
    var hc = this.getCellCenter(hcc.x, hcc.y);
    var ctx = this.ctx;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(hc.x - 2, hc.y - 2, 5, 5);
  }

  if (event.type === "mousedown") {
    this.notify({ src: this,
                  type: dt.EVENT_CELL_DOWN,
                  button: dt.BUTTON_MAPPING[event.button],
                  pos: hcc });
    
  } else if (event.type === "mouseup") {
    this.notify({ src: this,
                  type: dt.EVENT_CELL_UP,
                  button: dt.BUTTON_MAPPING[event.button],
                  pos: hcc });
  }
};
