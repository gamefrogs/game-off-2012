dt.LEVELLV3_STR = 
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
dt.LEVELDEFLV3 =
  new dt.LevelDef("Moustache", 11, 13, dt.LEVELLV3_STR,
                  [
                   { x: 3, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, endAct: 6 },
                   { x: 5, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, endAct: 5 },
                   { x: 2, y: 5, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 5, y: 8, type: dt.StraightStartPiece, dir: dt.Dir.SW, goal: false },
                   { x: 7, y: 8, type: dt.StraightStartPiece, dir: dt.Dir.SE, goal: false },
                  ],
                  [
                   { type: dt.StraightDominoPiece, limit: 9 },
                   { type: dt.TurnLeftDominoPiece, limit: 3 },
                   { type: dt.TurnRightDominoPiece, limit: 10 },
                  ]);
// Loads an image from an URL. Can be an absolute URL too.
dt.loadImageInto("resources/face.jpg", dt.LEVELDEFLV3, "img");

dt.LEVELDEFLV3.drawBackground = function(ctx) {
  dt.drawImageWithOverlay(ctx, this.img, this.getWidth(), this.getHeight(), 1, 0.2);
};
// Register level
dt.LEVELS.push(dt.LEVELDEFLV3);
