"use strict";

// The definition a level, used to build a playable instance of Level -----------
dt.LevelDef = function(width, height, str) {
  this.grid = new dt.Hexgrid(width, height);
  this.parseLevel(str);
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

dt.LEVEL1_STR = 
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     \n" +
  "| 0 . 0 . 0 . 0 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 2 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 2 . 2 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 3 . 4 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 3 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  "   _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     ";
dt.LEVELDEF1 = new dt.LevelDef(12, 14, dt.LEVEL1_STR);

dt.LEVEL2_STR = 
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     \n" +
  "| 0 . 0 . 0 . 0 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 . 2 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 2 . 2 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 3 . 4 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 3 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  "   _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     ";
dt.LEVELDEF2 = new dt.LevelDef(12, 14, dt.LEVEL2_STR);

dt.LEVELS = [ dt.LEVELDEF1,
              dt.LEVELDEF2
            ];

// Events ------------------
dt.EVENT_CELL_CHANGE = "CellChange";

// A runtime playable level, modifiable by the player -----------
dt.Level = function(def) {
  this.def = def;

  this.initObjects();
};

util.Observable.makeObservable(dt.Level);

dt.Level.prototype.initObjects = function() {
  this.objects = new dt.Hexgrid(this.def.getWidth(), this.def.getHeight());
  // TODO init objects based on level definition
  var tile = new dt.TileObject(dt.TILE_DOMINO, dt.Dir.W, true);
  this.setObjectXY(1, 1, tile);
  var goal = new dt.GoalObject(dt.Dir.NONE)
  this.setObjectXY(5, 5, goal);
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

dt.Level.prototype.findIncomingDirs = function(pos) {
  var dirs = [];
  for (var k = 0; k < dt.Dir.ALL.length; ++k) {
    var dir = dt.Dir.ALL[k];
    if (dir !== dt.Dir.NONE) {
      var npos = pos.dir(dir);
      if (this.isInside(npos)) {
        var nobj = this.getObject(npos);
        if ((nobj !== undefined) && nobj.isPossibleDestination(dir.opposite)) {
          // TODO also check the 'dest' of the object
          dirs.push(dir);
        }
      }
    }
  }
  return dirs;
};

dt.Level.prototype.canAddDomino = function(pos) {
  var obj = this.getObject(pos);
  if ((obj !== undefined) && (!obj.canReplace())) {
    return false;
  }
  var srcdirs = this.findIncomingDirs(pos);
  return (srcdirs.length > 0);
};

dt.Level.prototype.addDomino = function(pos) {
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

dt.Level.prototype.getStartPositions = function() {
  return this.getPositions("start");
};

dt.Level.prototype.getGoalPositions = function() {
  return this.getPositions("goal");
};

