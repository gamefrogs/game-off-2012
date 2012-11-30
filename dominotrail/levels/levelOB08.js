dt.LEVELOB08_STR = 
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
dt.LEVELOB08 =
  new dt.LevelDef("Turn it on", 11, 13, dt.LEVELOB08_STR,
                  [
                   { x: 2, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 1, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 1, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 3, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 4, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 5, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 7, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 10, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 1, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 6, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 7, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 9, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 1, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 6, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 8, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 9, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 0, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 1, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 2, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 3, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 5, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 8, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 0, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                  ],
                  [
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.RForkDominoPiece, limit: Infinity },
                   { type: dt.LForkDominoPiece, limit: Infinity },
                   { type: dt.ForkDominoPiece, limit: Infinity },
                   { type: dt.TriForkDominoPiece, limit: Infinity },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELOB08);
