"use strict";
var dt = dt || {};

// The hex grid will have the form
//    / \   / \   / \   / \   / \   / \
//   /   \ /   \ /   \ /   \ /   \ /   \
//  v     v     v     v     v     v     v
//  | 0,0 | 1,0 | 2,0 | 3,0 |     |     |
//  ^     ^     ^     ^     ^     ^     ^
//   \   / \   / \   / \   / \   / \   /
//    \ /   \ /   \ /   \ /   \ /   \ /
//     v     v     v     v     v     v
//     | 0,1 | 1,1 | 2,1 | 3,1 |     |     |
//     ^     ^     ^     ^     ^     ^     ^
//    / \   / \   / \   / \   / \   / \   /
//   /   \ /   \ /   \ /   \ /   \ /   \ /
//  v     v     v     v     v     v     v
//  | 0,2 | 1,2 | 2,2 | 3,2 |     |     |
//  ^     ^     ^     ^     ^     ^     ^
//   \   / \   / \   / \   / \   / \   /
//    \ /   \ /   \ /   \ /   \ /   \ /
//     v     v     v     v     v     v
//     | 0,3 | 1,3 | 2,3 | 3,3 |     |     |
//     ^     ^     ^     ^     ^     ^     ^
//    / \   / \   / \   / \   / \   / \   /

// Directions use cardinal direction notation
//       ^     
//   NW / \ NE      
//     /   \    
//    |     |
// W  |  *  |  E 
//    |     | 
//     \   / 
//   SW \ / SE 
//       v      

// Directions ------------------------------

dt.Dir = function(id, name) {
  this.id = id;
  this.name = name;
};

// This will create constants like dt.Dir.E for enum values, dt.Dir.NW_ID for enum ids and
// a dt.Dir.ALL array of all values indexed by id
util.makeEnum(dt.Dir,
              0, "E",
              1, "SE",
              2, "SW",
              3, "W",
              4, "NW",
              5, "NE",
              6, "NONE");


dt.Dir.left = function(dir) {
  if (dir === dt.Dir.NONE) {
    return dir;
    
  } else {
    return dt.Dir.ALL[(dir.id + 5) % 6]; // -1 modulo 6
  }
};

dt.Dir.right = function(dir) {
  if (dir === dt.Dir.NONE) {
    return dir;
    
  } else {
    return dt.Dir.ALL[(dir.id + 1) % 6]; // +1 modulo 6
  }
};

dt.Dir.opposite = function(dir) {
  if (dir === dt.Dir.NONE) {
    return dir;
    
  } else {
    return dt.Dir.ALL[(dir.id + 3) % 6]; // +3 modulo 6
  }
};

dt.Dir.precompute = function() {
  for (var k = 0; k < dt.Dir.ALL.length; ++k) {
    var dir = dt.Dir.ALL[k];
    dir.left = dt.Dir.left(dir);
    dir.right = dt.Dir.right(dir);
    dir.opposite = dt.Dir.opposite(dir);
  }
};

dt.Dir.precompute();


// Coordinates on hex grid ---------------
dt.Pos = function(x, y) {
  this.x = x;
  this.y = y;
};

// Precomputed deltas: first for y % 2 == 0, second for y % 2 == 1
dt.Pos.DIRS = [];
dt.Pos.DIRS[dt.Dir.E_ID]    = [ { dx:  1, dy:  0},  { dx:  1, dy:  0} ];
dt.Pos.DIRS[dt.Dir.SE_ID]   = [ { dx:  0, dy:  1},  { dx:  1, dy:  1} ];
dt.Pos.DIRS[dt.Dir.SW_ID]   = [ { dx: -1, dy:  1},  { dx:  0, dy:  1} ];
dt.Pos.DIRS[dt.Dir.W_ID]    = [ { dx: -1, dy:  0},  { dx: -1, dy:  0} ];
dt.Pos.DIRS[dt.Dir.NW_ID]   = [ { dx: -1, dy: -1},  { dx:  0, dy: -1} ];
dt.Pos.DIRS[dt.Dir.NE_ID]   = [ { dx:  0, dy: -1},  { dx:  1, dy: -1} ];
dt.Pos.DIRS[dt.Dir.NONE_ID] = [ { dx:  0, dy:  0},  { dx:  0, dy:  0} ];

dt.Pos.prototype.dir = function(dir) {
  var delta = dt.Pos.DIRS[dir.id][this.y % 2];
  return new dt.Pos(this.x + delta.dx, this.y + delta.dy);
};

// Hexagonal grid ------------------------
dt.Hexgrid = function(width, height) {
  this.init(width, height);
};

dt.Hexgrid.prototype.init = function(width, height) {
  this.width = width;
  this.height = height;
  this.cells = [];
  for (var y = 0; y < height; ++y) {
    this.cells.push(new Array(width));
  }
};

dt.Hexgrid.prototype.isInside = function(pos) {
  return ((pos.x >= 0) && (pos.x < this.width) &&
          (pos.y >= 0) && (pos.y < this.height));
};

dt.Hexgrid.prototype.getValue = function(pos) {
  return this.cells[pos.y][pos.x];
};

dt.Hexgrid.prototype.setValue = function(pos, value) {
  this.cells[pos.y][pos.x] = value;
};

dt.Hexgrid.prototype.isInsideXY = function(x, y) {
  return ((x >= 0) && (x < this.width) &&
          (y >= 0) && (y < this.height));
};

dt.Hexgrid.prototype.getValueXY = function(x, y) {
  return this.cells[y][x];
};

dt.Hexgrid.prototype.setValueXY = function(x, y, value) {
  this.cells[y][x] = value;
};

// Hexagonal grid with cell edges ---------------------
dt.Edgegrid = function(width, height) {
  this.init(width, height);
};

util.extend(dt.Hexgrid, dt.Edgegrid);

dt.Edgegrid.prototype.init = function(width, height) {
  dt.Hexgrid.prototype.init.call(this, width, height);
  this.edges = new dt.Hexgrid(width, height);
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < height; ++y) {
      this.edges.setValueXY(x, y, []);
    }
  }
};

dt.Edgegrid.prototype.getEdgeXY = function(x, y, dir) {
  var cellEdges = this.edges.getValueXY(x, y);
  return cellEdges[dir.id];
};

dt.Edgegrid.prototype.setEdgeXY = function(x, y, dir, value) {
  this.setEdge(new dt.Pos(x, y), dir, value);
};

dt.Edgegrid.prototype.getEdge = function(pos, dir) {
  return this.getEdgeXY(pos.x, pos.y, dir);
};

dt.Edgegrid.prototype.setEdge = function(pos, dir, value) {
  var cellEdges = this.edges.getValue(pos);
  cellEdges[dir.id] = value;
  // Put the same value for the opposite edge of the neighbour cell
  var neighbour = pos.dir(dir);
  if (this.isInside(neighbour)) {
    cellEdges = this.edges.getValue(neighbour);
    cellEdges[dir.opposite.id] = value;
  }
};