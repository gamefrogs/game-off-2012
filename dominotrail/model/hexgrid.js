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

dt.Pos.prototype.equals = function(pos) {
  return (this.x === pos.x) && (this.y === pos.y);
};

// Relative position represents a path from one cell to another. The absolute position can only
// be computed once the absolute start position is known
dt.RelativePos = function(dir, len) {
  this.segments = [];
  if ((dir !== undefined) && (len !== undefined)) {
    this.addSegment(dir, len);
  }
};

dt.RelativePos.difference = function(from, to) {
  var relpos = new dt.RelativePos();
  var cur = from;
  while (to.y - cur.y !== 0) {
    var dir = dt.Dir.NONE;
    if (to.y - cur.y > 0) { // Going south
      if (to.x - cur.x > 0) {
        dir = dt.Dir.SE;
      } else {
        dir = dt.Dir.SW;
      }
    } else {
      if (to.x - cur.x > 0) { // Going north
        dir = dt.Dir.NE;
      } else {
        dir = dt.Dir.NW;
      }
    }
    relpos.addSegment(dir, 1);
    cur = cur.dir(dir);
  }
  var dx = to.x - cur.x;
  if (dx > 0) { // Going east
    relpos.addSegment(dt.Dir.E, dx);
  } else if (dx < 0) { // Going west
    relpos.addSegment(dt.Dir.W, -dx);
  }
  relpos.normalize();
  return relpos;
};

dt.RelativePos.prototype.normalize = function() {
  // Force only positive values 
  for (var i = 0; i < dt.Dir.ALL.length; ++i) {
    var dir = dt.Dir.ALL[i];
    var dirlen = this.segments[dir.id] || 0;
    if (dirlen < 0) {
      this.segments[dir.id] = 0;
      this.addSegment(dir.opposite, -dirlen);
    }
  }
 
  // Cancel opposites
  for (var i = 0; i < dt.Dir.ALL.length; ++i) {
    var dir = dt.Dir.ALL[i];
    var opp = dir.opposite;
    var dirlen = this.segments[dir.id] || 0;
    var opplen = this.segments[opp.id] || 0;
    if ((dirlen !== 0) && (opplen !== 0)) {
      var diff = dirlen - opplen;
      if (diff >= 0) {
        this.segments[dir.id] = diff;
        this.segments[opp.id] = 0;
      } else {
        this.segments[dir.id] = 0;
        this.segments[opp.id] = -diff;
      }
    }
  }

  // Merge
  for (var i = 0; i < dt.Dir.ALL.length; ++i) {
    var dir = dt.Dir.ALL[i];
    if (dir === dt.Dir.NONE) {
      continue;
    }
    var next = dir.right.right;
    var dirlen = this.segments[dir.id] || 0;
    var nextlen = this.segments[next.id] || 0;
    if ((dirlen !== 0) && (nextlen !== 0)) {
      var merge = (dirlen < nextlen) ? dirlen : nextlen;
      this.addSegment(dir, -merge);
      this.addSegment(next, -merge);
      this.addSegment(dir.right, merge);
    }
  }
};

dt.RelativePos.prototype.addSegment = function(dir, len) {
  if (this.segments[dir.id] === undefined) {
    this.segments[dir.id] = len;
  } else {
    this.segments[dir.id] += len;
  }
};

dt.RelativePos.prototype.getAbsolutePos = function(from) {
  var absPos = from;
  for (var s = 0; s < this.segments.length; ++s) {
    var dir = dt.Dir.ALL[s];
    var segment = this.segments[s];
    if ((segment !== undefined) && (segment !== 0)) {
      for (var i = 0; i < segment; ++i) {
        absPos = absPos.dir(dir);
      }
    }
  }
  return absPos;
};

dt.RelativePos.prototype.equals = function(relpos) {
  for (var s = 0; s < this.segments.length; ++s) {
    var segment1 = this.segments[s] || 0;
    var segment2 = relpos.segments[s] || 0;
    if (segment1 !== segment2) {
      return false;
    }
  }
  return true;
};

dt.RelativePos.prototype.invert = function() {
  var inverse = new dt.RelativePos();
  for (var s = 0; s < this.segments.length; ++s) {
    var segment = this.segments[s];
    if (segment !== undefined) {
      inverse.addSegment(dt.Dir.ALL[s].opposite, segment);
    }
  }
  return inverse;
};

// Relative position + dir
dt.RelPosDir = function(relpos, dir) {
  this.relpos = relpos;
  this.dir = dir;
};

dt.RelPosDir.prototype.equals = function(relposdir) {
  return (this.dir === relposdir.dir) && (this.relpos.equals(relposdir.relpos));
};

dt.RelPosDir.arrayContains = function(rpds, rpd) {
  for (var i = 0; i < rpds.length; ++i) {
    if (rpd.equals(rpds[i])) {
      return true;
    }
  }
  return false;
};

dt.RelPosDir.arrayMatch = function(rpd1, rpd2) {
  for (var i = 0; i < rpd1.length; ++i) {
    if (!dt.RelPosDir.arrayContains(rpd2, rpd1[i])) {
      return false;
    }
  }
  return true;
};

dt.RelPosDir.arrayIntersect = function(rpd1, rpd2) {
  var inter = [];
  for (var i = 0; i < rpd1.length; ++i) {
    if (dt.RelPosDir.arrayContains(rpd2, rpd1[i])) {
      inter.push(rpd1[i]);
    }
  }
  return inter;
};

dt.RelPosDir.arrayUnion = function(rpd1, rpd2) {
  var union = [];
  for (var i = 0; i < rpd1.length; ++i) {
    if (!dt.RelPosDir.arrayContains(union, rpd1[i])) {
      union.push(rpd1[i]);
    }
  }
  for (var j = 0; j < rpd2.length; ++j) {
    if (!dt.RelPosDir.arrayContains(union, rpd2[j])) {
      union.push(rpd2[j]);
    }
  }
  return union;
};

dt.RelPosDir.arrayToAbsolute = function(rpd, from) {
  var ret = [];
  for (var i = 0; i < rpd.length; ++i) {
    ret.push(new dt.AbsPosDir(rpd[i].relpos.getAbsolutePos(from), rpd[i].dir));
  }
  return ret;
};

// Special case
dt.HERE = new dt.RelativePos();
dt.HERE.getAbsolutePos = function(from) {
  return from;
};


// Absolute position + dir
dt.AbsPosDir = function(abspos, dir) {
  this.abspos = abspos;
  this.dir = dir;
};

dt.AbsPosDir.prototype.equals = function(absposdir) {
  return (this.dir === absposdir.dir) && (this.abspos.equals(absposdir.abspos));
};

dt.AbsPosDir.prototype.transpose = function() {
  var nabspos = this.abspos.dir(this.dir);
  var ndir = this.dir.opposite;
  return new dt.AbsPosDir(nabspos, ndir);
};

dt.AbsPosDir.arrayContains = function(rpds, rpd) {
  for (var i = 0; i < rpds.length; ++i) {
    if (rpd.equals(rpds[i])) {
      return true;
    }
  }
  return false;
};

dt.AbsPosDir.arrayMatch = function(rpd1, rpd2) {
  for (var i = 0; i < rpd1.length; ++i) {
    if (!dt.AbsPosDir.arrayContains(rpd2, rpd1[i])) {
      return false;
    }
  }
  return true;
};

dt.AbsPosDir.arrayIntersect = function(rpd1, rpd2) {
  var inter = [];
  for (var i = 0; i < rpd1.length; ++i) {
    if (dt.AbsPosDir.arrayContains(rpd2, rpd1[i])) {
      inter.push(rpd1[i]);
    }
  }
  return inter;
};

dt.AbsPosDir.arrayUnion = function(rpd1, rpd2) {
  var union = [];
  for (var i = 0; i < rpd1.length; ++i) {
    if (!dt.AbsPosDir.arrayContains(union, rpd1[i])) {
      union.push(rpd1[i]);
    }
  }
  for (var j = 0; j < rpd2.length; ++j) {
    if (!dt.AbsPosDir.arrayContains(union, rpd2[j])) {
      union.push(rpd2[j]);
    }
  }
  return union;
};

dt.AbsPosDir.arrayToRelative = function(apds, from) {
  var rpds = [];
  for (var i = 0; i < apds.length; ++i) {
    rpds.push(new dt.RelPosDir(dt.RelativePos.difference(from, apds[i].abspos),
                               apds[i].dir));
  }
  return rpds;
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