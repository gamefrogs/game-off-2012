"use strict";

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
