dt.LEVELOB04_STR = 
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
dt.LEVELOB04 =
  new dt.LevelDef("OB 4", 11, 13, dt.LEVELOB04_STR,
                  [
                   { x: 2, y: 3, type: dt.Wall, dir: dt.Dir.SE, goal: false },
                   { x: 4, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 3, type: dt.Wall, dir: dt.Dir.SE, goal: false },
                   { x: 1, y: 4, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 5, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 4, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 2, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 5, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 6, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 8, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 8, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 2, y: 9, type: dt.Wall, dir: dt.Dir.SE, goal: false },
                   { x: 4, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.SE, goal: false },
                  ],
                  [
                   { type: dt.TurnLeftDominoPiece, limit: 6 },
                   { type: dt.TurnRightDominoPiece, limit: 6 },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELOB04);
