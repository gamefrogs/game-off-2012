"use strict";

var dt = dt || {};

// Start function
dt.start = function() {
  util.init();

  var game = new dt.Game();
  var view = new dt.View(document.getElementById("gamearea"), game);
  var controller = new dt.Controller(view, game);
};
