dt.LEVELLV4_STR = 
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
dt.LEVELDEFLV4 =
  new dt.LevelDef("Splitting Headache", 11, 13, dt.LEVELLV4_STR,
                  [
                   { x: 3, y: 3, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 3, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 0, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 6, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 4, y: 9, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 5, y: 11, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 5, y: 12, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                  ],
                  [
                   { type: dt.TurnRightDominoPiece, limit: 8 },
                   { type: dt.TurnLeftDominoPiece, limit: 6 },
                   { type: dt.StraightDominoPiece, limit: 5 },
                   { type: dt.LForkDominoPiece, limit: 2 },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELDEFLV4);
