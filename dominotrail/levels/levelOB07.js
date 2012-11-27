dt.LEVELOB07_STR = 
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
dt.LEVELOB07 =
  new dt.LevelDef("Happy New Year", 11, 13, dt.LEVELOB07_STR,
                  [
                   { x: 0, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 1, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 7, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 2, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 6, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 2, type: dt.StraightStartPiece, dir: dt.Dir.SW, goal: false },
                   { x: 9, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 7, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 10, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 8, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 8, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 1, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 4, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 12, type: dt.StraightStartPiece, dir: dt.Dir.SW, goal: false },
                   { x: 2, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
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
dt.LEVELS.push(dt.LEVELOB07);
