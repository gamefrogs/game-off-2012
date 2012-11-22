"use strict";

dt.PieceSelector = function(viewport, ctx) {
  this.viewport = viewport;
  this.ctx = ctx;

  this.grid = new dt.Hexgrid(3, 4);
  this.initGrid();
  this.pieces = new dt.Hexgrid(this.grid.getWidth(), this.grid.getHeight());
  
  // Some drawing constants
  this.RADIUS = 30;
  this.DCX = this.RADIUS * Math.sqrt(3);
  this.INDENT_DCX = [0, this.DCX / 2];
  this.DCY = this.RADIUS * 1.5;
  
  this.HX = (this.RADIUS - 2) * Math.sqrt(3) / 2;
  this.HY = (this.RADIUS - 2) / 2;

  this.OFFSETX = (this.viewport.width - ((this.grid.getWidth() - 0.5) * this.DCX)) / 2;
  this.OFFSETY = (this.viewport.height - (this.DCY * (this.grid.getHeight() + 1/3))) / 2 +
    this.RADIUS;

  this.pieceCount = 0;
  this.render();
};

dt.PieceSelector.prototype.initGrid = function() {
  for (var y = 0; y < this.grid.getHeight(); ++y) {
    for (var x = 0; x < this.grid.getWidth(); ++x) {
      this.grid.setValueXY(x, y, y);
    }
  }
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

dt.PieceSelector.BACKGROUND_COLOR = ["#000000", "#00ffff", "#0000ff", "#008000", "#c09060"];

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
      this.renderCellBackground(x, y, fill, "#c0c0c0");

      this.renderCellContent(x, y);
    }
  }
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

dt.PieceSelector.prototype.destroy = function() {
};
