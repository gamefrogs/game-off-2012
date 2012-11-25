dt.LEVEL5_STR = 
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
dt.LEVELDEF5 =
  new dt.LevelDef("The Long Way Home", 11, 13, dt.LEVEL5_STR,
                  [
                   { x: 0, y: 0, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 1, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 2, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 1, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 2, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true, rebour2: 112 },
                   { x: 8, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 11, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 12, type: dt.Wall, dir: dt.Dir.E, goal: false },
                  ],
                  [
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELDEF5);
