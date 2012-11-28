dt.LEVELLV5_STR = 
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
dt.LEVELDEFLV5 =
  new dt.LevelDef("Synchronicity", 11, 13, dt.LEVELLV5_STR,
                  [
                    { x: 0, y: 0, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 0, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 5, y: 2, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.NE, goal: true, beginAct: 18, endAct: 19 },
                   { x: 9, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.NW, goal: true, beginAct: 18, endAct: 19 },
                   { x: 5, y: 4, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 1, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true, beginAct: 18, endAct: 19 },
                   { x: 5, y: 6, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 9, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true, beginAct: 18, endAct: 19 },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 1, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, beginAct: 18, endAct: 19 },
                   { x: 8, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true, beginAct: 18, endAct: 19 },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 2, y: 12, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true, beginAct: 18, endAct: 19 },
                   { x: 5, y: 12, type: dt.Wall, dir: dt.Dir.NE, goal: false },
                   { x: 8, y: 12, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true, beginAct: 18, endAct: 19 },
                  ],
                  [
                   { type: dt.StraightDominoPiece, limit: Infinity },
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.ForkDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.LForkDominoPiece, limit: Infinity },
                   { type: dt.RForkDominoPiece, limit: Infinity },
                   { type: dt.TriForkDominoPiece, limit: Infinity },
                  ]);
// Register level
dt.LEVELS.push(dt.LEVELDEFLV5);
