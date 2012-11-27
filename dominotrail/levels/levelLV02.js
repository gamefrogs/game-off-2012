dt.LEVELLV2_STR = 
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
dt.LEVELDEFLV2 =
  new dt.LevelDef("Snoopy", 11, 13, dt.LEVELLV2_STR,
                  [
                   { x: 3, y: 2, type: dt.StraightStartPiece, dir: dt.Dir.NW, goal: false },
                   { x: 5, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, endAct: 9 },
                   { x: 7, y: 4, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true, endAct: 8 },
                   { x: 2, y: 5, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, endAct: 9 },
                   { x: 7, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true, endAct: 7 },
                   { x: 2, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true, endAct: 8 },
                   { x: 5, y: 7, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true, endAct: 6 },
                   { x: 4, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true, endAct: 7 },
                  ],
                  [
                   { type: dt.StraightDominoPiece, limit: 5 },
                   { type: dt.LForkDominoPiece, limit: 2 },
                   { type: dt.TriForkDominoPiece, limit: 1 },
                   { type: dt.RForkDominoPiece, limit: 2 },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELDEFLV2);
