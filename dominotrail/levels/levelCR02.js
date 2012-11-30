dt.LEVELCR2_STR = 
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
dt.LEVELCR2DEF1 =
  new dt.LevelDef("Petite Fleur", 11, 13, dt.LEVELCR2_STR,
                  [
                   { x: 5, y: 0, type: dt.StraightStartPiece, dir: dt.Dir.NE, goal: false },
                   { x: 9, y: 1, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 10, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 1, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 4, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 6, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 9, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 1, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 5, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 7, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 8, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 9, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 1, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 4, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 8, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 2, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 3, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 7, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 8, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 3, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 5, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 6, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 5, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true },
                  ],
                  [
                   { type: dt.LForkDominoPiece, limit: Infinity },
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.TriForkDominoPiece, limit: Infinity },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.RForkDominoPiece, limit: Infinity },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELCR2DEF1);

