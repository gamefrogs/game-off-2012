"use strict";

dt.EVENT_CELL_OVER = "CellOver";
dt.EVENT_CELL_DOWN = "CellDown";
dt.EVENT_CELL_UP = "CellUp";
dt.EVENT_CELL_OUT = "CellOut";

dt.BUTTON_LEFT = "ButtonLeft";
dt.BUTTON_RIGHT = "ButtonRight";
dt.BUTTON_MIDDLE = "ButtonMiddle";

dt.BUTTON_MAPPING = [ dt.BUTTON_LEFT, dt.BUTTON_MIDDLE, dt.BUTTON_RIGHT ];

dt.LevelRenderer = function(round, viewport, ctx, radius) {
  this.round = round;
  this.level = round.level;
  this.round.addObserver(this);
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

dt.LevelRenderer.BACKGROUND_COLOR = ["#95b2df", "#95b2df", "#85a2cf", "#7592bf", "#6582af"];

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
  if (this.mouseListener !== undefined) {
    // Listeners already initialized: don't create new ones [issue #10]
    return;
  }
  
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

dt.LevelRenderer.prototype.renderBackground = function(ctx) {
  if (!this.cachedBackground) {
    var offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = 600;
    offscreenCanvas.height = 600;
    var osctx = offscreenCanvas.getContext("2d");
    if (this.level.canDrawBackground()) {
      this.level.drawBackground(osctx);
    } else {
      this.renderDefaultBackground(osctx);
    }
    this.cachedBackground = offscreenCanvas;
  }
  ctx.drawImage(this.cachedBackground, 0, 0);
};
  
dt.LevelRenderer.prototype.renderDefaultBackground = function(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var back = this.level.getBackground();
  for (var x = 0; x < back.getWidth(); ++x) {
    for (var y = 0; y < back.getHeight(); ++y) {
      var value = back.getValueXY(x, y);
      var fill = this.getBackground(value);
      this.renderCellBackground(ctx, x, y, fill, "#c0c0c0");
    }
  }
};

dt.LevelRenderer.prototype.render = function(percent) {
  this.renderBackground(this.ctx);

  for (var x = 0; x < this.level.getWidth(); ++x) {
    for (var y = 0; y < this.level.getHeight(); ++y) {
      this.renderCellContent(x, y, percent || 0);
    }
  }
};

dt.LevelRenderer.prototype.renderOverlay = function(pos, piece) {
  var hc = this.getCellCenter(pos.x, pos.y);
  var ctx = this.ctx;
  ctx.save();
  ctx.globalAlpha = piece.getOverlayAlpha();
  ctx.translate(hc.x, hc.y);
  piece.draw(ctx, 0);
  ctx.restore();
};

dt.squaredist = function(x0, y0, x1, y1) {
  return ((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0));
};

dt.LevelRenderer.prototype.getCellCenter = function(x, y) {
  return new dt.Pos(this.DCX * (x + 0.5) + this.INDENT_DCX[y % 2],
                    this.DCY * y + this.RADIUS);
};

dt.LevelRenderer.prototype.renderCellBackground = function(ictx, x, y, fill, stroke, width) {
  var ctx = ictx || this.ctx;
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

dt.LevelRenderer.prototype.drawGoal = function(ctx, obj) {
  var color = obj.isGoalReached() ? "#00ff00" : "#ffa000";
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, this.RADIUS - 2, 0, 2 * Math.PI, false);
  ctx.stroke();
};

dt.LevelRenderer.prototype.drawLocked = function(ctx) {
  ctx.strokeStyle = "#ff00ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, this.RADIUS - 6, 0, 2 * Math.PI, false);
  ctx.stroke();
};

dt.LevelRenderer.prototype.renderCellContent = function(x, y, percent) {
  var ctx = this.ctx;
  var obj = this.level.getObjectXY(x, y);
  if (obj !== undefined) {
    var hc = this.getCellCenter(x, y);

    ctx.save();
    ctx.translate(hc.x, hc.y);
    if (obj instanceof dt.BasePiece) {
      obj.draw(ctx, percent || 0);
      // Show goal status
      if (obj.isGoal()) {
        this.drawGoal(ctx, obj);
      }
      if (this.level.designMode && obj.isLocked()) {
        this.drawLocked(ctx);
      }

      // Show countdown status
      if( obj.asCompteur() ){
      
        ctx.globalAlpha = 0.8;
        if( obj.isFreeze() ){
            
            //forbiden circle
            ctx.save();
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "#0f0f0f";
            ctx.beginPath();
            ctx.arc(0, 0, dt.RADIUS * 0.8, 0, dt.FULL_CIRCLE, false);
            ctx.moveTo(dt.RADIUS * 0.4, dt.RADIUS * 0.1);
            ctx.lineTo(dt.RADIUS * 0.4, -dt.RADIUS * 0.1);
            ctx.lineTo(-dt.RADIUS * 0.4, -dt.RADIUS * 0.1);
            ctx.lineTo(-dt.RADIUS * 0.4, dt.RADIUS * 0.1);
            ctx.fill();
            ctx.restore();
            
            if( obj.getBegin()>0){
                ctx.fillStyle = "#FF0000";
                ctx.font = "bold 15px Verdana"; 
                ctx.textBaseline = "middle";
                ctx.fillText(obj.getBegin(), -10, -10); 
            }
            if(obj.getEnd()>0){
                ctx.fillStyle = "#0000FF";
                ctx.font = "bold 15px Verdana"; 
                ctx.textBaseline = "middle";
                ctx.fillText(obj.getEnd(), -10, 10); 
            }
            
        }else{
            ctx.fillStyle = "#00FF00";
            if( obj.getRetour()>0){
                ctx.font = "bold 30px Verdana";
                ctx.textBaseline = "middle";
                ctx.fillText(obj.getRebour(), -10, 0);
            }
        }
      }
    } else {
      ctx.font = "30px Verdana";
      ctx.fillStyle = "#000000";
      ctx.textBaseline = "middle";
      ctx.fillText("?", -5, 0);
    }
    ctx.restore();
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
};

dt.LevelRenderer.prototype.mouseHandler = function(event) {
  if (event.type === "mouseout") {
    this.notify({ src: this,
                  type: dt.EVENT_CELL_OUT });
    return;
  }
  
  var mx = event.clientX + util.windowScrollX() - this.x0;
  var my = event.clientY + util.windowScrollY() - this.y0;

  var hcc = this.getHexPosition(mx, my);

  if (event.type === "mousemove") {
    this.notify({ src: this,
                  type: dt.EVENT_CELL_OVER,
                  pos: hcc });
  } else if (event.type === "mousedown") {
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
