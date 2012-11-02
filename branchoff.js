"use strict";

var util = {};

util.nop = function() {};

util.getPagePosition = function(elem) {
  var x = 0;
  var y = 0;
  var e = elem;
  while (e) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return {x: x, y: y};
};

util.init = function() {
  util.initLog();
  util.initScroll();
};

util.initLog = function() {
  if (!window.console) {
    if (window.opera) {
      util.log = opera.postError;
    } else {
      util.log = util.nop;
    }
  } else if (console.log["apply"]) {
    // Chrome does not allow direct aliasing of console.log... but console.log is a normal
    //  javascript function with an "apply" method
    util.log = function() { console.log.apply(console, arguments); };
  } else {
    // IE9 has console.log, but it's not a real function: no apply available
    // Also, arguments is not a real array, so no join()...
    // And it's only available when developer tools are open
    util.log = function() { var args = [];
                            for (var i in arguments) args.push(arguments[i]);
                            console.log(args.join(" "));
                          };
  }
};

util.initScroll = function() {
  if (window.scrollX !== undefined) {
    util.windowScrollX = function() {
      return window.scrollX;
    };
    util.windowScrollY = function() {
      return window.scrollY;
    };
  } else {
    // This is for Internet Explorer
    util.windowScrollX = function() {
      return document.body.parentNode.scrollLeft;
    };
    util.windowScrollY = function() {
      return document.body.parentNode.scrollTop;
    };
  }
};

var branchoff = {};

branchoff.Pair = function(x, y) {
  this.x = x;
  this.y = y;
};

branchoff.Pair.prototype.toString = function() {
  return this.x + "," + this.y;
};

// Directions
branchoff.NODIR = new branchoff.Pair( 0,  0);
branchoff.NORTH = new branchoff.Pair( 0,  1);
branchoff.EAST  = new branchoff.Pair( 1,  0);
branchoff.SOUTH = new branchoff.Pair( 0, -1);
branchoff.WEST  = new branchoff.Pair(-1,  0);

branchoff.oppositeDir = function(dir) {
  switch (dir) {
  case branchoff.NORTH:
    return branchoff.SOUTH;
  case branchoff.EAST:
    return branchoff.WEST;
  case branchoff.SOUTH:
    return branchoff.NORTH;
  case branchoff.WEST:
    return branchoff.EAST;
  default:
    return branchoff.NODIR;
  }
};

branchoff.rotateDirRight = function(dir) {
  switch (dir) {
  case branchoff.NORTH:
    return branchoff.EAST;
  case branchoff.EAST:
    return branchoff.SOUTH;
  case branchoff.SOUTH:
    return branchoff.WEST;
  case branchoff.WEST:
    return branchoff.NORTH;
  default:
    return branchoff.NODIR;
  }
};

branchoff.rotateDirLeft = function(dir) {
  switch (dir) {
  case branchoff.NORTH:
    return branchoff.WEST;
  case branchoff.EAST:
    return branchoff.NORTH;
  case branchoff.SOUTH:
    return branchoff.EAST;
  case branchoff.WEST:
    return branchoff.SOUTH;
  default:
    return branchoff.NODIR;
  }
};

branchoff.nextPos = function(pos, dir) {
  return new branchoff.Pair(pos.x + dir.x, pos.y + dir.y);
};

// Bud states
branchoff.BUD_NO    = 0;
branchoff.BUD_ALIVE = 1;
branchoff.BUD_DEAD  = 2;

// Section types
branchoff.SECTION_END      = 0;
branchoff.SECTION_STRAIGHT = 1;
branchoff.SECTION_CURVE    = 2;
branchoff.SECTION_FORK     = 3;

// Class representing a section of the tree
branchoff.Section = function(pos, srcdir, type, bud, destdir1, destdir2) {
  this.pos = pos;
  this.srcdir = srcdir;
  this.type = type;
  this.bud = bud;
  this.destdir1 = destdir1;
  this.destdir2 = destdir2;
};


// Class representing the whole tree
branchoff.Tree = function() {
  this.sections = {};
};

branchoff.Tree.prototype.addSection = function(section) {
  var pos = section.pos;
  var key = pos.toString();
  if (this.sections[key] == null) {
    this.sections[key] = [];
  }
  this.sections[key].push(section);
};

branchoff.Tree.prototype.getSectionsAt = function(pos) {
  var key = pos.toString();
  return this.sections[key];
};

branchoff.Tree.prototype.grow = function() {
  // Temporary array to store all sections that need to grow, to avoid modifying this.sections
  // while iterating over its keys
  var toGrow = [];
  for (var k in this.sections) {
    var secs = this.sections[k];
    for (var i = 0; i < secs.length; ++i) {
      var section = secs[i];
      if (section.bud == branchoff.BUD_DEAD) {
        section.bud = branchoff.BUD_NO;
        section.type = branchoff.SECTION_END;
        
      } else if (section.bud == branchoff.BUD_ALIVE) {
        toGrow.push(section);
      }
    }
  }

  for (var t = 0; t < toGrow.length; ++t) {
    this.growSection(toGrow[t]);
  }
};

branchoff.Tree.prototype.growSection = function(section) {
  var dest;
  switch (section.type) {
  case branchoff.SECTION_END:
    // Should not happen
    alert("Cannot grow end with bud");
    break;

  case branchoff.SECTION_STRAIGHT:
    dest = branchoff.nextPos(section.pos, branchoff.oppositeDir(section.srcdir));
    this.addSection(new branchoff.Section(dest, section.srcdir,
                                          branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE));
    break;

  case branchoff.SECTION_CURVE:
    dest = branchoff.nextPos(section.pos, section.destdir1);
    this.addSection(new branchoff.Section(dest, branchoff.oppositeDir(section.destdir1),
                                          branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE));
    break;

  case branchoff.SECTION_FORK:
    dest = branchoff.nextPos(section.pos, section.destdir1);
    this.addSection(new branchoff.Section(dest, branchoff.oppositeDir(section.destdir1),
                                          branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE));
    dest = branchoff.nextPos(section.pos, section.destdir2);
    this.addSection(new branchoff.Section(dest, branchoff.oppositeDir(section.destdir2),
                                          branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE));
    break;
  }
  section.bud = branchoff.BUD_NO;
};


// Start function
branchoff.start = function() {
  util.init();
  var view = document.getElementById("view");
  var ctx = view.getContext("2d");
  branchoff.ctx = ctx;

  
  var viewpos = util.getPagePosition(view);
  view.x0 = viewpos.x;
  view.y0 = viewpos.y;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, view.width, view.height);

  var tree = new branchoff.Tree();
  branchoff.tree = tree;
  /*tree.addSection(new branchoff.Section(new branchoff.Pair(7, 0), branchoff.SOUTH,
                                        branchoff.SECTION_STRAIGHT, branchoff.BUD_NO));
  tree.addSection(new branchoff.Section(new branchoff.Pair(7, 1), branchoff.SOUTH,
                                        branchoff.SECTION_FORK, branchoff.BUD_NO,
                                        branchoff.WEST, branchoff.NORTH));
  tree.addSection(new branchoff.Section(new branchoff.Pair(6, 1), branchoff.EAST,
                                        branchoff.SECTION_CURVE, branchoff.BUD_NO, branchoff.NORTH));
  tree.addSection(new branchoff.Section(new branchoff.Pair(6, 2), branchoff.SOUTH,
                                        branchoff.SECTION_FORK, branchoff.BUD_NO,
                                        branchoff.WEST, branchoff.NORTH));
  tree.addSection(new branchoff.Section(new branchoff.Pair(5, 2), branchoff.EAST,
                                        branchoff.SECTION_CURVE, branchoff.BUD_DEAD,
                                        branchoff.NORTH));
  tree.addSection(new branchoff.Section(new branchoff.Pair(6, 3), branchoff.SOUTH,
                                        branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE,
                                        branchoff.NORTH));
  tree.addSection(new branchoff.Section(new branchoff.Pair(7, 2), branchoff.SOUTH,
                                        branchoff.SECTION_CURVE, branchoff.BUD_NO, branchoff.EAST));
  tree.addSection(new branchoff.Section(new branchoff.Pair(8, 2), branchoff.WEST,
                                        branchoff.SECTION_FORK, branchoff.BUD_ALIVE,
                                        branchoff.NORTH, branchoff.SOUTH));*/
  tree.addSection(new branchoff.Section(new branchoff.Pair(7, 0), branchoff.SOUTH,
                                        branchoff.SECTION_STRAIGHT, branchoff.BUD_ALIVE));
  branchoff.renderTree(ctx, tree);


  view.addEventListener("mousedown", function(event) {
    branchoff.onClick(event, view, ctx, tree);
  }, false);

  view.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  }, false);
};

branchoff.setMode = function(mode) {
  branchoff.mode = mode;
  document.getElementById("push").className = "button" + (mode === "push" ? "down" : "up");
  document.getElementById("cut").className = "button" + (mode === "cut" ? "down" : "up");
  document.getElementById("branch").className = "button" + (mode === "branch" ? "down" : "up");
};

branchoff.grow = function() {
  util.log("Growing...");
  branchoff.tree.grow();
  branchoff.renderTree(branchoff.ctx, branchoff.tree);
  var end = new Date().getTime();
  util.log("Grown", end - start, "ms");
};

branchoff.onClick = function(event, view, ctx, tree) {
  var start = new Date().getTime();

  var x = event.clientX + util.windowScrollX() - view.x0;
  var y = event.clientY + util.windowScrollY() - view.y0;

  var cx = Math.floor(x / branchoff.CELLSIZE);
  var cy = branchoff.MAXSIZE - 1 - Math.floor(y / branchoff.CELLSIZE);

  if (event.button == 0) {
    var pos = new branchoff.Pair(cx, cy);
    var sections = tree.getSectionsAt(pos);
    if (sections != null) {
      for (var s = 0; s < sections.length; ++s) {
        var section = sections[s];

        if (branchoff.mode === "cut") {
          if (section.bud === branchoff.BUD_ALIVE) {
            section.bud = branchoff.BUD_DEAD;
          } else if (section.bud === branchoff.BUD_DEAD) {
            section.bud = branchoff.BUD_ALIVE;
          }
          
        } else if (branchoff.mode === "push") {
          if (section.bud === branchoff.BUD_ALIVE) {
            if (section.type === branchoff.SECTION_STRAIGHT) {
              section.type = branchoff.SECTION_CURVE;
              section.destdir1 = branchoff.rotateDirLeft(section.srcdir);
              
            } else if (section.type === branchoff.SECTION_CURVE) {
              if (section.destdir1 === branchoff.rotateDirLeft(section.srcdir)) {
                section.destdir1 = branchoff.oppositeDir(section.destdir1);
              } else {
                section.type = branchoff.SECTION_STRAIGHT;
              }
            }
          }
          
        } else if (branchoff.mode === "branch") {
          if (section.bud === branchoff.BUD_ALIVE) {
            if ((section.type === branchoff.SECTION_STRAIGHT) ||
                (section.type === branchoff.SECTION_CURVE)) {
              section.type = branchoff.SECTION_FORK;
              section.destdir1 = branchoff.rotateDirRight(section.srcdir);
              section.destdir2 = branchoff.rotateDirRight(section.destdir1);
              
            } else if (section.type === branchoff.SECTION_FORK) {
              if (section.destdir2 === branchoff.rotateDirRight(section.destdir1)) {
                if (section.destdir1 === branchoff.rotateDirRight(section.srcdir)) {
                  section.destdir2 = branchoff.rotateDirRight(section.destdir2);
                } else {
                  section.type = branchoff.SECTION_STRAIGHT;
                }
              } else {
                section.destdir1 = branchoff.rotateDirRight(section.destdir1);
              }
            }
          }
        }
      }
      branchoff.renderTree(ctx, tree);
    }
  }
};
