"use strict";

dt.EVENT_PIECE_SELECTED = "PieceSelected";

dt.PieceSelector = function(round, viewport, ctx) {
  this.viewport = viewport;
  this.ctx = ctx;
  this.level = round.level;

  this.grid = new dt.Hexgrid(3, 5);
  this.initGrid();
  this.pieces = new dt.Hexgrid(this.grid.getWidth(), this.grid.getHeight());

  // Some drawing constants
  this.RADIUS = 30;
  this.DCX = this.RADIUS * Math.sqrt(3);
  this.INDENT_DCX = [0, this.DCX / 2];
  this.DCY = this.RADIUS * 1.5;
  
  this.HX = (this.RADIUS + 0.5) * Math.sqrt(3) / 2;
  this.HY = (this.RADIUS + 0.5) / 2;

  this.OFFSETX = (this.viewport.width - ((this.grid.getWidth() - 0.5) * this.DCX)) / 2;
  this.OFFSETY = (this.viewport.height - (this.DCY * (this.grid.getHeight() + 1/3))) / 2 +
    this.RADIUS;

  this.pieceCount = 0;
  this.selectedPos = new dt.Pos(0, 0);
};

util.extend(util.Observable, dt.PieceSelector);

dt.PieceSelector.prototype.init = function() {
  var pos0 = util.getPagePosition(this.viewport);
  this.x0 = pos0.x;
  this.y0 = pos0.y;

  this.initLevel();
  this.initListeners();
  this.render();
};

dt.PieceSelector.prototype.initLevel = function() {
  this.level.addObserver(this);
  var usablePieces = this.getUsablePieces();
  for (var i = 0; i < usablePieces.length; ++i) {
    var piece = usablePieces[i];
    this.addPiece(piece.type.create(dt.Dir.E));
  }
};

dt.PieceSelector.prototype.initGrid = function() {
  for (var y = 0; y < this.grid.getHeight(); ++y) {
    for (var x = 0; x < this.grid.getWidth(); ++x) {
      this.grid.setValueXY(x, y, y);
    }
  }
};

dt.PieceSelector.prototype.getUsablePieces = function() {
  var pieces = [];
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var piece = dt.USABLE_PIECES[i];
    var limit = this.level.getLimitForPiece(piece.type);
    if (limit > 0) {
      pieces.push(piece);
    }
  }
  return pieces;
};

dt.PieceSelector.prototype.initListeners = function() {
  var that = this;
  this.mouseListener = function(event) {
    that.mouseHandler(event);
  };
  this.viewport.addEventListener("mousedown", this.mouseListener, false);
};

dt.PieceSelector.prototype.destroy = function() {
  this.exitListeners();
  this.level.removeObserver(this);
};

dt.PieceSelector.prototype.exitListeners = function() {
  this.viewport.removeEventListener("mousedown", this.mouseListener, false);
  this.mouseListener = null;
};

dt.PieceSelector.prototype.addPiece = function(piece) {
  var y = Math.floor(this.pieceCount / this.grid.getWidth());
  var x = this.pieceCount % this.grid.getWidth();
  this.pieceCount += 1;
  this.pieces.setValueXY(x, y, piece);
  this.render();
};

dt.PieceSelector.prototype.getCellCenter = function(x, y) {
  return new dt.Pos(this.OFFSETX + this.DCX * x + this.INDENT_DCX[y % 2],
                    this.OFFSETY + this.DCY * y);
};

dt.PieceSelector.BACKGROUND_COLOR = ["#45628f", "#55729f", "#6582af", "#7592bf", "#85a2cf"];

dt.PieceSelector.prototype.getBackground = function(value) {
  return dt.PieceSelector.BACKGROUND_COLOR[value];
};

dt.PieceSelector.prototype.render = function() {
  var ctx = this.ctx;
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  var back = this.grid;
  for (var x = 0; x < back.getWidth(); ++x) {
    for (var y = 0; y < back.getHeight(); ++y) {
      var value = back.getValueXY(x, y);
      var fill = this.getBackground(value);
      this.renderCellBackground(x, y, fill);

      this.renderCellContent(x, y);
    }
  }
  this.renderCellBackground(this.selectedPos.x, this.selectedPos.y, undefined, "#c0c0d0", 4);
  ctx.restore();
};

dt.PieceSelector.prototype.renderCellContent = function(x, y) {
  var ctx = this.ctx;
  var obj = this.pieces.getValueXY(x, y);
  if (obj !== undefined) {
    var hc = this.getCellCenter(x, y);

    ctx.save();
    ctx.translate(hc.x, hc.y);
    if (obj instanceof dt.BasePiece) {
      obj.draw(ctx, 0);
      var limit = this.level.getLimitForTypeName(obj.typeName);
      ctx.fillStyle = "#ff0000";
      ctx.fillText("" + limit, 0, 0);
    }
    ctx.restore();
  }
};


dt.PieceSelector.prototype.renderCellBackground = function(x, y, fill, stroke, width) {
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

// Returns the hex coordinates corresponding to some graphical "mouse" coordinates
dt.PieceSelector.prototype.getHexPosition = function(mx, my) {
  var cy0 = Math.floor((my - this.OFFSETY) / this.DCY);
  var cx0 = Math.floor((mx - this.INDENT_DCX[Math.abs(cy0) % 2] - this.OFFSETX) / this.DCX);
  var cx1 = cx0 + 1;
  var cy1 = cy0;
  var cy2 = cy0 + 1;
  var cx2 = cx0 + (Math.abs(cy0) % 2);
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


dt.PieceSelector.prototype.mouseHandler = function(event) {
  var mx = event.clientX + util.windowScrollX() - this.x0;
  var my = event.clientY + util.windowScrollY() - this.y0;

  var hcc = this.getHexPosition(mx, my);
  if (this.grid.isInside(hcc) && event.button === 0) {
    var piece = this.pieces.getValue(hcc);
    if (piece !== undefined) {
      this.selectedPos = hcc;
      this.render();
      this.notify({ src: this,
                    type: dt.EVENT_PIECE_SELECTED,
                    typeName: piece.typeName });
    }
  }
  
};

dt.PieceSelector.prototype.update = function(event) {
  if ((event.src === this.level) && (event.type === dt.EVENT_LIMIT_CHANGE)) {
    util.log("Changed limit: ", event);
  }
};
