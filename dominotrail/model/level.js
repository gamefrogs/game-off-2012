"use strict";

// The definition a level, used to build a playable instance of Level -----------
dt.LevelDef = function(title, width, height, str, pieces, limits) {
  this.title = title;
  this.grid = new dt.Hexgrid(width, height);
  this.parseLevel(str);
  this.pieces = pieces;
  this.limits = limits;
};

dt.LevelDef.prototype.getWidth = function() {
  return this.grid.width;
};

dt.LevelDef.prototype.getHeight = function() {
  return this.grid.height;
};

dt.LevelDef.prototype.isInside = function(pos) {
  return this.grid.isInside(pos);
};

dt.LevelDef.prototype.isInsideXY = function(x, y) {
  return this.grid.isInsideXY(x, y);
};

dt.LevelDef.prototype.getValueXY = function(x, y) {
  return this.grid.getValueXY(x, y);
};

dt.LevelDef.prototype.parseLevel = function(str) {
  var lines = str.split("\n");
  var edges = true;
  var y = 0;
  for (var l = 0; l < lines.length; ++l) {
    var line = lines[l];
    // Ignore empty lines
    if (line.trim().length === 0) {
      continue;
    }

    var elems = line.trim().split(" ");
    if (edges) {
      // TODO parse edges
      
    } else {
      //TODO parse edges

      // Parse cells
      for (var x = 0; x < this.getWidth(); ++x) {
        var value = +elems[2 * x + 1]; // Notice the + to convert to number
        this.grid.setValueXY(x, y, value);
      }
      y += 1;
    }

    edges = !edges;
  }
};

dt.LEVELS = [];

// Events ------------------
dt.EVENT_CELL_CHANGE = "CellChange";

// A runtime playable level, modifiable by the player -----------
dt.Level = function(def, designMode) {
  this.def = def;

  this.initObjects(designMode);
  this.initLimits(designMode);
};

util.Observable.makeObservable(dt.Level);

dt.Level.prototype.initObjects = function(designMode) {
  this.objects = new dt.Hexgrid(this.def.getWidth(), this.def.getHeight());
  for (var i = 0; i < this.def.pieces.length; ++i) {
    var pieceDef = this.def.pieces[i];
    var piece = pieceDef.type.create(pieceDef.dir);
    piece.locked = !designMode;
    if (pieceDef.goal) {
      piece.goal = true;
    }
    this.setObject(pieceDef, piece);
  }
};

dt.Level.prototype.initLimits = function(designMode) {
  // In designMode, don't implement limits
  this.limits = [];
  if (!designMode) {
    for (var i = 0; i < this.def.limits.length; ++i) {
      var limit = this.def.limits[i];
      this.limits.push({ type: limit.type, limit: limit.limit });
    }
    for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
      var pieceType = dt.USABLE_PIECES[i].type;
      if (this.getLimitForPiece(pieceType) === undefined) {
        this.limits.push({ type: pieceType, limit: (pieceType.defaultLimit || 0) });
      }
    }
  }
};

dt.Level.prototype.getWidth = function() {
  return this.def.getWidth();
};

dt.Level.prototype.getHeight = function() {
  return this.def.getHeight();
};

dt.Level.prototype.getBackground = function() {
  return this.def;
};

dt.Level.prototype.isInside = function(pos) {
  return this.def.isInside(pos);
};

dt.Level.prototype.isInsideXY = function(x, y) {
  return this.def.isInsideXY(x, y);
};

dt.Level.prototype.getObject = function(pos) {
  return this.objects.getValue(pos);
};

dt.Level.prototype.getObjectXY = function(x, y) {
  return this.objects.getValueXY(x, y);
};

dt.Level.prototype.setObject = function(pos, obj) {
  this.objects.setValue(pos, obj);
  this.notify({ src: this,
                type: dt.EVENT_CELL_CHANGE,
                pos: pos });
};

dt.Level.prototype.setObjectXY = function(x, y, obj) {
  this.objects.setValue(new dt.Pos(x, y), obj);
};

dt.Level.prototype.removeObject = function(pos) {
  this.setObject(pos, undefined);
};

dt.Level.prototype.findIncomingDirs = function(pos) {
  var dirs = [];
  for (var k = 0; k < dt.Dir.ALL.length; ++k) {
    var dir = dt.Dir.ALL[k];
    if (dir !== dt.Dir.NONE) {
      var npos = pos.dir(dir);
      if (this.isInside(npos)) {
        var nobj = this.getObject(npos);
        if (nobj !== undefined) {
          if (nobj instanceof dt.BasePiece) {
            var outs = nobj.getOutputs();
            for (var o = 0; o < outs.length; ++o) {
              var relposdir = outs[o];
              if (dt.HERE.equals(relposdir.relpos) && (relposdir.dir === dir.opposite)) {
                dirs.push(relposdir.dir.opposite);
              }
            }
          }
        }
      }
    }
  }
  return dirs;
};

dt.Level.prototype.canAddDomino = function(pos) {
  if (this.getObject(pos) === undefined) {
    var srcdirs = this.findIncomingDirs(pos);
    return srcdirs.length > 0;
  }
};

dt.Level.prototype.canAddPiece = function(pos, piece) {
  // For each cell occupied by the piece, check that it is inside the board and available
  if (this.getObject(pos) !== undefined) {
    return false;
  }
  var otherCells = piece.getOtherCells();
  for (var i = 0; i < otherCells.length; ++i) {
    var otherPos = otherCells[i].getAbsolutePos(pos);
    if (!(this.isInside(otherPos) && (this.getObject(otherPos) === undefined))) {
      return false;
    }
  }
  
  return true;
};

dt.Level.prototype.canRemovePiece = function(pos) {
  var piece = this.getObject(pos);
  if (piece === undefined) {
    return false;
    
  } else {
    return !piece.locked;
  }
};

dt.Level.prototype.addDomino = function(pos) {
  var srcdirs = this.findIncomingDirs(pos);
  if (srcdirs.length > 0) {
    var srcdir = srcdirs[0];
    var domino = dt.StraightDominoPiece.create(srcdir);
    this.setObject(pos, domino);
  }
};

dt.Level.prototype.addPiece = function(pos, piece) {
  this.setObject(pos, piece);
  var otherCells = piece.getOtherCells();
  for (var i = 0; i < otherCells.length; ++i) {
    var relpos = otherCells[i];
      var ghost = new dt.GhostPiece(piece, relpos);
    var otherPos = relpos.getAbsolutePos(pos);
    this.setObject(otherPos, ghost);
  }
};

dt.Level.prototype.removePiece = function(pos) {
  var pieceOrGhost = this.getObject(pos);
  var isGhost = (pieceOrGhost instanceof dt.GhostPiece);
  var piece = isGhost ? pieceOrGhost.piece : pieceOrGhost;
  var realPos = isGhost ? pieceOrGhost.relpos.invert().getAbsolutePos(pos) : pos;
  var otherCells = piece.getOtherCells();
  for (var i = 0; i < otherCells.length; ++i) {
    var otherPos = otherCells[i].getAbsolutePos(realPos);
    this.removeObject(otherPos);
  }
  this.removeObject(realPos);
};

dt.Level.prototype.addDomino00 = function(pos) {
  var srcdirs = this.findIncomingDirs(pos);

  if (srcdirs.length > 0) {
    for (var i = 0; i < srcdirs.length; ++i) {
      var srcdir = srcdirs[i];
      if (i === 0) {
        var tile = new dt.TileObject(dt.TILE_DOMINO, srcdir);
        var replaced = this.getObject(pos);
        if (replaced !== undefined) {
          replaced.replaceBy(tile);
        }
        this.setObject(pos, tile);
      }

      var prevPos = pos.dir(srcdir);
      var prevObj = this.getObject(prevPos);
      if (!prevObj.hasDestination(srcdir.opposite)) {
        prevObj.addDestination(srcdir.opposite);
      }
    }
  }
};

// Find positions containing object having property prop set to a true-ish value
dt.Level.prototype.getPositions = function(prop) {
  var pos = [];
  for (var y = 0; y < this.getHeight(); ++y) {
    for (var x = 0; x < this.getWidth(); ++x) {
      var obj = this.getObjectXY(x, y);
      if ((obj !== undefined) && obj[prop]) {
        pos.push(new dt.Pos(x, y));
      }
    }
  }
  return pos
};

// Find pieces responding 'true' to a method call. method is the name of the method
dt.Level.prototype.getPieces = function(method) {
  var pos = [];
  for (var y = 0; y < this.getHeight(); ++y) {
    for (var x = 0; x < this.getWidth(); ++x) {
      var obj = this.getObjectXY(x, y);
      if ((obj !== undefined) && (obj instanceof dt.BasePiece) && obj[method].call(obj)) {
        pos.push(obj);
      }
    }
  }
  return pos
};

dt.Level.prototype.getGoalPieces = function() {
  return this.getPieces("isGoal");
};

// The following two functions are not good for performance, but enough for now
dt.Level.prototype.getLimitForPiece = function(type) {
  for (var i = 0; i < this.limits.length; ++i) {
    var limit = this.limits[i];
    if (limit.type === type) {
      return limit.limit;
    }
  }
  return undefined;
};

dt.Level.prototype.changeLimitForPiece = function(type, delta) {
  for (var i = 0; i < this.limits.length; ++i) {
    var limit = this.limits[i];
    if (limit.type === type) {
      limit.limit += delta;
      return limit.limit;
    }
  }
  return undefined;
};