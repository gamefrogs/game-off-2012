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
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 3 . 4 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 3 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  "   _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     ";
dt.LEVELDEF1 = new dt.LevelDef(12, 14, dt.LEVEL1_STR);


// A runtime playable level, modifiable by the player -----------
dt.Level = function(def) {
  this.def = def;

  this.initObjects();
};

util.Observable.makeObservable(dt.Level);

dt.Level.prototype.initObjects = function() {
  this.objects = new dt.Hexgrid(this.def.getWidth(), this.def.getHeight());
  var tile = new dt.TileObject(dt.TILE_DOMINO, dt.Dir.W);
  this.objects.setValueXY(1, 1, tile);
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
