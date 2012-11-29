"use strict";

// The definition a level, used to build a playable instance of Level -----------
dt.LevelDef = function(title, width, height, str, pieces, limits) {
  this.title = title;
  this.grid = new dt.Hexgrid(width, height);
  this.parseLevel(str);
  this.pieces = pieces;
  this.limits = limits;
};

dt.LevelDef.prototype.getTitle = function() {
  return this.title;
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
dt.EVENT_LIMIT_CHANGE = "LimitChange";
dt.EVENT_LEVEL_CLEARED = "LevelCleared";

// A runtime playable level, modifiable by the player -----------
dt.Level = function(def, designMode) {
  this.def = def;
  this.designMode = (designMode || this.def.designMode);

  this.initObjects(this.designMode);
  this.initLimits(this.designMode);
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
    if (pieceDef.endAct){
        piece.setRebour1(pieceDef.endAct);
    }
    if( pieceDef.beginAct){
        piece.setRebour2(pieceDef.beginAct);
    }
    this.setObject(pieceDef, piece);
  }
};

dt.Level.prototype.initLimits = function(designMode) {
  this.limits = {};
  for (var i = 0; i < this.def.limits.length; ++i) {
    var limit = this.def.limits[i];
    this.limits[limit.type.prototype.typeName] = limit.limit;
  }
  for (var i = 0; i < dt.USABLE_PIECES.length; ++i) {
    var pieceType = dt.USABLE_PIECES[i].type;
    if (designMode) {
      this.limits[pieceType.prototype.typeName] = Infinity;
      
    } else if (this.getLimitForPiece(pieceType) === undefined) {
      this.limits[pieceType.prototype.typeName] = (pieceType.defaultLimit || 0);
    }
  }
};

dt.Level.prototype.clear = function() {
  this.initObjects(this.designMode);
  this.initLimits(this.designMode);
  this.notify({ src: this,
                type: dt.EVENT_LEVEL_CLEARED });
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
  // Eraser first
  if (piece instanceof dt.Eraser) {
    return (this.designMode ||
            ((this.getObject(pos) instanceof dt.BasePiece) &&
             (!this.getObject(pos).isLocked())));

    // Then lock and goal tools
  } else if ((piece instanceof dt.LockMode) ||
             (piece instanceof dt.GoalMode)) {
    return (this.getObject(pos) instanceof dt.BasePiece);
  }

  // Finally, check normal pieces
  // Check the limit
  if (this.getLimitForTypeName(piece.typeName) <= 0) {
    return false;
  }
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
    return this.designMode || !piece.isLocked();
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
  this.changeLimitForPiece(piece.typeName, -1);
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
  this.changeLimitForPiece(piece.typeName, 1);
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

dt.Level.prototype.getLimitForPiece = function(type) {
  return this.limits[type.prototype.typeName];
};

dt.Level.prototype.getLimitForTypeName = function(typeName) {
  return this.limits[typeName];
};

dt.Level.prototype.getInitialLimitForPiece = function(type) {
  if (this.designMode) {
    return Infinity;
  }
  for (var i = 0; i < this.def.limits.length; ++i) {
    var limit = this.def.limits[i];
    if (limit.type === type) {
      return limit.limit;
    }
  }
  return type.defaultLimit || 0;
};

dt.Level.prototype.changeLimitForPiece = function(typeName, delta) {
  if (typeName in this.limits) {
    var oldLimit = this.limits[typeName];
    var newLimit = oldLimit + delta;
    this.limits[typeName] = newLimit;
    this.notify({src: this,
                 type: dt.EVENT_LIMIT_CHANGE,
                 typeName: typeName,
                 from: oldLimit,
                 to: newLimit});
    return newLimit;
  }
  return undefined;
};

dt.Level.prototype.setGoal = function(pos) {
  var obj = this.getObject(pos);
  obj.goal = true;
};

dt.Level.prototype.generateBackgroundString = function() {
  var back = this.getBackground();
  var all = "";
  var line, x, y;
  for (y = 0; y < this.getHeight(); ++y) {
    line = '  " ';
    // First, the NW and NE walls
    for (x = 0; x < this.getWidth(); ++x) {
      line += ". . ";
    }
    line += '    \\n" +\n';
    all += line;
    // Then the contents of the cells, with E-W walls
    line = '  "';
    if (y % 2 === 1) {
      line += "  ";
    };
    for (x = 0; x < this.getWidth(); ++x) {
      line += ". " + back.getValueXY(x, y) + " ";
    }
    line += ". "; // Last wall
    if (y % 2 === 0) {
      line += "  ";
    };
    line += ' \\n" +\n';
    all += line;
  }
  // Then, the SW and SE walls of the last row
  line = '  " ';
  for (x = 0; x < this.getWidth(); ++x) {
    line += ". . ";
  }
  line += '    ";\n';
  all += line;
  return all;
};

dt.Level.prototype.findFreeId = function() {
  var free = false;
  for (var id = 0; dt["LEVELDEF" + id]; ++id) {
  }
  return id;
};

dt.Level.prototype.findLimits = function() {
  var limits = {};
  for (var y = 0; y < this.getHeight(); ++y) {
    for (var x = 0; x < this.getWidth(); ++x) {
      var piece = this.getObjectXY(x, y);
      if ((piece !== undefined) && (!piece.isLocked())) {
        var limit = limits[piece.typeName] || 0;
        limits[piece.typeName] = limit + 1;
      }
    }
  }
  return limits;
};

dt.Level.prototype.generateSource = function(title) {
  var id = this.findFreeId();
  var src = "dt.LEVEL" + id + "_STR = \n";
  src += this.generateBackgroundString();
  //
  src += "dt.LEVELDEF" + id + " =\n";
  src += '  new dt.LevelDef("' + title + '", ' + this.getWidth() + ", " + this.getHeight() +
    ", dt.LEVEL" + id + "_STR,\n";
  
  // Fixed level pieces
  src += "                  [\n";
  for (var y = 0; y < this.getHeight(); ++y) {
    for (var x = 0; x < this.getWidth(); ++x) {
      var piece = this.getObjectXY(x, y);
      if ((piece !== undefined) && (piece.isLocked())) {
        src += '                   { x: ' + x + ', y: ' + y + ', type: ' + piece.typeName +
          ', dir: dt.Dir.' + piece.dir.name + ', goal: ' + piece.isGoal() + ' },\n';
      }
    }
  }
  src += "                  ],\n";
  // Piece limits
  var limits = this.findLimits();
  src += "                  [\n";
  for (var k in limits) {
    src += "                   { type: " + k + ", limit: " + limits[k] + " },\n";
  }
  src += "                  ]);\n";

  // Register
  src += "// Register level\n";
  src += "dt.LEVELS.push(dt.LEVELDEF" + id + ");\n";
  return src;
};

dt.Level.prototype.canDrawBackground = function() {
  return (this.def.drawBackground &&
          (this.def.drawBackground instanceof Function));
};

dt.Level.prototype.drawBackground = function(ctx) {
  this.def.drawBackground(ctx);
};

dt.Level.prototype.getTitle = function() {
  return this.def.title;
};

dt.Level.prototype.getInformation = function() {
  return this.def.information;
};
