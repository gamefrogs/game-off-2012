dt.LEVELCR4_STR = 
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . .     ";
dt.LEVELCR4DEF1 =
  new dt.LevelDef("Recumbent", 11, 13, dt.LEVELCR4_STR,
                  [
                   { x: 10, y: 1, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 2, y: 2, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 2, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 9, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                  ],
                  [
                                    { type: dt.LForkDominoPiece, limit: Infinity },
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.TriForkDominoPiece, limit: Infinity },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.RForkDominoPiece, limit: Infinity }
                  ]);
                  
// Loads an image from an URL. Can be an absolute URL too.
dt.loadImageInto("resources/velo.png", dt.LEVELCR4DEF1, "img");

dt.LEVELCR4DEF1.drawBackground = function(ctx) {
  dt.drawImageWithOverlay(ctx, this.img, this.getWidth(), this.getHeight());
};
// Register level
dt.LEVELS.push(dt.LEVELCR4DEF1);

