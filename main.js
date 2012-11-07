"use strict";

var dt = dt || {};

// Start function
dt.start = function() {
  util.init();

  var game = new dt.Game();
  game.addObserver({
    update: function(event) {
      util.log("Game update", event);
    }
  });

  var view = new dt.View(document.getElementById("gamearea"), game);

  game.changeState(dt.STATE_ROUND_SUCCESS);

  /*
  var view = document.getElementById("view");
  var ctx = view.getContext("2d");

  var viewpos = util.getPagePosition(view);
  view.x0 = viewpos.x;
  view.y0 = viewpos.y;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, view.width, view.height);
  
  view.addEventListener("mousedown", function(event) {
    dt.onClick(event, view, ctx, game);
  }, false);

  view.addEventListener("contextmenu", function(event) {
    event.preventDefault();
  }, false);*/
};

dt.onClick = function(event, view, ctx, game) {
  if (event.button == 0) { // Left-click
    
    var action = branchoff.mode;

    var x = event.clientX + util.windowScrollX() - view.x0;
    var y = event.clientY + util.windowScrollY() - view.y0;
    
    //
  }
};
