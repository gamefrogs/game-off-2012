"use strict";

dt.TILE_DOMINO = "Domino";

// A TileObject represents an 'object' on a tile
dt.TileObject = function(type, src, start) {
  this.type = type;
  this.src = src; // Incoming direction
  this.dest = []; // Outgoing directions
  this.start = !!start; // Make sure this.start is a boolean
  this.dead = false;
};

dt.TileObject.prototype.getType = function() {
  return this.type;
};

dt.TileObject.prototype.getSrc = function() {
  return this.src;
};

dt.TileObject.prototype.hasDestination = function(dest) {
  for (var i = 0; i < this.dest.length; ++i) {
    if (this.dest[i] === dest) {
      return true;
    }
  }
  return false;
};

dt.TileObject.prototype.addDestination = function(dest) {
  this.dest.push(dest);
};

dt.TileObject.prototype.getPossibleDestinations = function() {
  var dests = [];
  for (var d = 0; d < dt.Dir.ALL; ++d) {
    var dir = dt.Dir.ALL[d];
    if (this.isPossibleDestination(dir)) {
      dests.push(dir);
    }
  }
  return dests;
};

dt.TileObject.prototype.isPossibleDestination = function(dest) {
  // TODO specialize based on object type: this is only for domino
  return ((dest === this.src.opposite) ||
          (dest === this.src.opposite.left) ||
          (dest === this.src.opposite.right));
};

dt.TileObject.prototype.getDestinations = function() {
  return this.dest;
};

dt.TileObject.prototype.die = function() {
  this.dead = true;
};

dt.TileObject.prototype.isDead = function() {
  return this.dead;
};

dt.TileObject.prototype.canReplace = function() {
  return false;
};


// TileObject inheritance utilities -------
dt.TileObject.newType = function(name, type, ctor) {
  dt[name] = function(src, start) {
    dt.TileObject.call(this, this.type, src, start);
    ctor.apply(this, arguments)
  };
  dt[name].prototype = new dt.TileObject(type);
};


// GoalObject -----------------------
dt.TILE_GOAL = "Goal";
dt.TileObject.newType("GoalObject", dt.TILE_GOAL,
                      function(type, src, start) {
                        this.goal = true;
                      });

dt.GoalObject.prototype.canReplace = function() {
  return true;
};

dt.GoalObject.prototype.replaceBy = function(obj) {
  obj.goal = true;
};
