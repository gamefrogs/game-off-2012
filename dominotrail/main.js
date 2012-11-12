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
  var controller = new dt.Controller(view, game);
};

dt.onClick = function(event, view, ctx, game) {
  if (event.button == 0) { // Left-click
    
    var action = branchoff.mode;

    var x = event.clientX + util.windowScrollX() - view.x0;
    var y = event.clientY + util.windowScrollY() - view.y0;
    
    //
  }
};
