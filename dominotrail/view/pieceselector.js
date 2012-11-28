"use strict";

dt.EVENT_PIECE_SELECTED = "PieceSelected";
dt.EVENT_ROTATE_LEFT = "RotateLeft";
dt.EVENT_ROTATE_RIGHT = "RotateRight";

dt.PieceSelector = function(round, viewport, ctx) {
  this.viewport = viewport;
  this.ctx = ctx;
  this.level = round.level;

  this.grid = new dt.Hexgrid(3, 6);
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

};

util.extend(util.Observable, dt.PieceSelector);

dt.PieceSelector.prototype.init = function() {
  var pos0 = util.getPagePosition(this.viewport);
  this.x0 = pos0.x;
  this.y0 = pos0.y;

  this.initGridAndPieces();
  this.pieceCount = 0;
  this.selectedPos = new dt.Pos(0, 0);
  this.initLevel();
  this.initListeners();
  this.selectDeltaPiece(0); // Make sure the level controller is aware of the piece
  this.render();
};

dt.PieceSelector.prototype.initLevel = function() {
  this.level.addObserver(this);
  var usablePieces = this.getUsablePieces();
  for (var i = 0; i < usablePieces.length; ++i) {
    var piece = usablePieces[i];
    this.addPiece(piece.type.create(dt.Dir.W));
  }

  var j = 1;
  //this.pieces.setValueXY(this.pieces.getWidth() - j, this.pieces.getHeight() - 1,
  //                       dt.Eraser.create(dt.Dir.NONE));
  //j += 1;

  if (this.level.designMode) {
    this.pieces.setValueXY(this.pieces.getWidth() - j, this.pieces.getHeight() - 1,
                           dt.GoalMode.create(dt.Dir.NONE));
    j += 1;
    
    this.pieces.setValueXY(this.pieces.getWidth() - j, this.pieces.getHeight() - 1,
                           dt.LockMode.create(dt.Dir.NONE));
  }
  this.render;
};

dt.PieceSelector.prototype.initGridAndPieces = function() {
  for (var y = 0; y < this.grid.getHeight(); ++y) {
    for (var x = 0; x < this.grid.getWidth(); ++x) {
      this.grid.setValueXY(x, y, y);
      this.pieces.setValueXY(x, y, undefined);
    }
  }
};

dt.PieceSelector.prototype.getUsablePieces = function() {
  var pieces = [];
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var piece = dt.USABLE_PIECES[i];
    var limit = this.level.getInitialLimitForPiece(piece.type);
    if (limit > 0) {
      pieces.push(piece);
    }
  }
  return pieces;
};

dt.PieceSelector.prototype.initListeners = function() {
  var that = this;
  if (this.mouseListener === undefined) {
    this.mouseListener = function(event) {
      that.mouseHandler(event);
    };
    this.viewport.addEventListener("mousedown", this.mouseListener, false);
  }
  
  if (this.keyListener === undefined) {
    this.keyListener = function(event) {
      that.keyHandler(event);
    };
    document.body.addEventListener("keydown", this.keyListener, false);
  }
};

dt.PieceSelector.prototype.destroy = function() {
  this.exitListeners();
  this.level.removeObserver(this);
};

dt.PieceSelector.prototype.exitListeners = function() {
  this.viewport.removeEventListener("mousedown", this.mouseListener, false);
  this.mouseListener = undefined;
  document.body.removeEventListener("keydown", this.keyListener, false);
  this.keyListener = undefined;
};

dt.PieceSelector.prototype.addPiece = function(piece) {
  var y = Math.floor(this.pieceCount / this.grid.getWidth());
  var x = this.pieceCount % this.grid.getWidth();
  this.pieceCount += 1;
  this.pieces.setValueXY(x, y, piece);
};

dt.PieceSelector.prototype.getCellCenter = function(x, y) {
  return new dt.Pos(this.OFFSETX + this.DCX * x + this.INDENT_DCX[y % 2],
                    this.OFFSETY + this.DCY * y);
};

dt.PieceSelector.BACKGROUND_COLOR = ["#55729f", "#6582af", "#7592bf",
                                     "#85a2cf", "#95b2df", "#a5c2ef"];

dt.PieceSelector.prototype.getBackground = function(value) {
  return dt.PieceSelector.BACKGROUND_COLOR[value];
};

dt.PieceSelector.prototype.render = function() {
  var ctx = this.ctx;
  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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
      ctx.scale(this.RADIUS / dt.RADIUS, this.RADIUS / dt.RADIUS);
      obj.draw(ctx, 0);
      //if (!(obj instanceof dt.Eraser)) {
        var limit = this.level.getLimitForTypeName(obj.typeName);
      if (limit !== undefined) {
        var txt = (limit === Infinity ? "\u221e" : ("" + limit));
        ctx.font = "bold 12px Verdana";
        var metrics = ctx.measureText(txt);
        ctx.fillStyle = "#ffA000";
        ctx.fillText(txt, -metrics.width / 2, dt.RADIUS * 0.75);
      }
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


dt.PieceSelector.prototype.selectPiece = function(pos, piece) {
  this.selectedPos = pos;
  this.render();
  this.notify({ src: this,
                type: dt.EVENT_PIECE_SELECTED,
                typeName: piece.typeName });
};

dt.PieceSelector.prototype.mouseHandler = function(event) {
  var mx = event.clientX + util.windowScrollX() - this.x0;
  var my = event.clientY + util.windowScrollY() - this.y0;

  var hcc = this.getHexPosition(mx, my);
  if (this.grid.isInside(hcc) && event.button === 0) {
    var piece = this.pieces.getValue(hcc);
    if (piece !== undefined) {
      this.selectPiece(hcc, piece);
    }
  }
};

dt.PieceSelector.prototype.keyHandler = function(event) {
  if (event.keyCode === 38) { // Down
    this.selectNextPiece();
    event.preventDefault();
    
  } else if (event.keyCode === 40) { // Up
    this.selectPreviousPiece();
    event.preventDefault();
    
  /*} else if ((event.keyCode === 8) ||  // Backspace
             (event.keyCode === 46)) { // Delete
    this.selectEraser();
    event.preventDefault(); */
    
  } else if (event.keyCode === 37) { // Left
    this.notify({ src: this,
                  type: dt.EVENT_ROTATE_LEFT });
    
  } else if (event.keyCode === 39) { // Right
    this.notify({ src: this,
                  type: dt.EVENT_ROTATE_RIGHT });
  }
};

dt.PieceSelector.prototype.update = function(event) {
  if ((event.src === this.level) && (event.type === dt.EVENT_LIMIT_CHANGE)) {
    this.render();
  }
};

dt.PieceSelector.prototype.selectNextPiece = function() {
  this.selectDeltaPiece(1);
};

dt.PieceSelector.prototype.selectPreviousPiece = function() {
  this.selectDeltaPiece(-1);
};

dt.PieceSelector.prototype.selectEraser = function() {
  var x = this.grid.getWidth() - 1;
  var y = this.grid.getHeight() - 1;
  var piece = this.pieces.getValueXY(x, y);
  this.selectPiece(new dt.Pos(x, y), piece);
};

dt.PieceSelector.prototype.selectDeltaPiece = function(delta) {
  var pos = new dt.Pos(this.selectedPos.x, this.selectedPos.y);
  var piece = undefined;

  while (piece === undefined) {
    pos.x += delta;
    if ((pos.x < 0) || (pos.x >= this.grid.getWidth())) {
      pos.x = (delta > 0) ? 0 : this.grid.getWidth() - 1;
      pos.y += delta;
      if ((pos.y < 0) || (pos.y >= this.grid.getHeight())) {
        pos.y = (delta > 0) ? 0 : this.grid.getHeight() - 1;
      }
    }
    piece = this.pieces.getValue(pos);
  }
  this.selectPiece(pos, piece);
};
