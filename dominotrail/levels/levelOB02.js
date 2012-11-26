dt.LEVELOB02_STR = 
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
dt.LEVELOB02 =
  new dt.LevelDef("Arghhh !!!", 11, 13, dt.LEVELOB02_STR,
                  [
                   { x: 0, y: 0, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 6, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 3, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 7, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 2, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 7, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 2, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 8, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 2, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 7, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 3, y: 10, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 7, y: 10, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 3, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 4, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 5, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 6, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
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
dt.LEVELS.push(dt.LEVELOB02);
