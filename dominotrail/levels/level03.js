dt.LEVEL5_STR = 
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  ". 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .    \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     \n" +
  "  . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 .  \n" +
  " . . . . . . . . . . . . . . . . . . . . . . . .     ";
dt.LEVELDEF5 =
  new dt.LevelDef("Third level", 12, 14, dt.LEVEL5_STR,
                  [
                   { x: 6, y: 2, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 3, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true,rebour2:10 },
                   { x: 6, y: 4, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 1, y: 5, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 5, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 6, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 9, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 8, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true ,rebour1: 12},
                  ],
                  [{ type: dt.StraightDominoPiece, limit: 15 },
		           { type: dt.ForkDominoPiece, limit: 1},
		           { type: dt.TurnRightDominoPiece, limit: 4},
		           { type: dt.TurnLeftDominoPiece, limit: 4}
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELDEF5);

