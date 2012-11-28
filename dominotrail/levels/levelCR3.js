dt.LEVELCR3_STR = 
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
dt.LEVELCR3DEF1 =
  new dt.LevelDef("Bad Head", 11, 13, dt.LEVELCR3_STR,
                  [
                   { x: 2, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 4, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 3, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 5, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 5, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 7, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 7, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 10, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true, beginAct:7, endAct: 8 },
                   { x: 7, y: 10, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true, beginAct:20, endAct:21 },
                   { x: 3, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                  ],
                  [
                   { type: dt.LForkDominoPiece, limit: Infinity },
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.TriForkDominoPiece, limit: Infinity },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.RForkDominoPiece, limit: Infinity }
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELCR3DEF1);

