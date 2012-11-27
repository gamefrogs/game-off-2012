dt.LEVELCRR1_STR = 
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
dt.LEVELCRRDEF1 =
  new dt.LevelDef("Petit Obsede", 11, 13, dt.LEVELCRR1_STR,
                  [
                   { x: 0, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true },
                   { x: 1, y: 5, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 5, type: dt.TurnRightDominoPiece, dir: dt.Dir.W, goal: true },
                   { x: 1, y: 6, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 6, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 6, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true },
                   { x: 1, y: 7, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 3, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                  ],
                  [
                   { type: dt.TurnLeftDominoPiece, limit: 4 },
                   { type: dt.TurnRightDominoPiece, limit: 6 },
                   { type: dt.StraightDominoPiece, limit: 10 },
                   { type: dt.TriForkDominoPiece, limit: 1 },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELCRRDEF1);



