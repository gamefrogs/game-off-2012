dt.LEVEL1_STR = 
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     \n" +
  "| 0 . 0 . 0 . 0 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 2 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 2 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 3 . 4 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _       ";
dt.LEVELDEF1 =
  new dt.LevelDef("First level", 11, 13, dt.LEVEL1_STR,
                  [{ x: 10, y: 1, type: dt.StraightStartPiece, dir: dt.Dir.E },
                   { x: 2, y: 1, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true }],
                  [{ type: dt.StraightDominoPiece, limit: 7 }]);

// Loads an image from an URL. Can be an absolute URL too.
dt.loadImageInto("resources/fire.jpg", dt.LEVELDEF1, "img");

dt.LEVELDEF1.drawBackground = function(ctx) {
  dt.drawImageWithOverlay(ctx, this.img, this.getWidth(), this.getHeight());
};


// Register level
dt.LEVELS.push(dt.LEVELDEF1);
