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