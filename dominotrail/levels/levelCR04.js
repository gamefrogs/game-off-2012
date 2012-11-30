
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
                   { x: 6, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true, beginAct:6, endAct:7 },
                   { x: 10, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 0, y: 3, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
               { x: 4, y: 5, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: true, beginAct:5, endAct: 6 },
                  ],
                  [
                   { type: dt.RForkDominoPiece, limit: 2 },
                   { type: dt.TurnRightDominoPiece, limit: 3 },
                   { type: dt.TurnLeftDominoPiece, limit: 4 },
                   { type: dt.StraightDominoPiece, limit: 5 },
                  ]);
                  
// Loads an image from an URL. Can be an absolute URL too.
dt.loadImageInto("resources/velo.png", dt.LEVELCR4DEF1, "img");

dt.LEVELCR4DEF1.drawBackground = function(ctx) {
  dt.drawImageWithOverlay(ctx, this.img, this.getWidth(), this.getHeight());
};
// Register level
dt.LEVELS.push(dt.LEVELCR4DEF1);

