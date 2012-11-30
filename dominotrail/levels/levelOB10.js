dt.LEVELOB10_STR = 
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
dt.LEVELOB10 =
  new dt.LevelDef("Choose the right door", 11, 13, dt.LEVELOB10_STR,
                  [
                   { x: 0, y: 0, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 1, y: 0, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 2, y: 0, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 3, y: 0, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 4, y: 0, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 5, y: 0, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 0, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 7, y: 0, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 8, y: 0, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 0, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 10, y: 0, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 0, y: 1, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 1, y: 1, type: dt.TurnRightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 3, y: 1, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 1, type: dt.TurnRightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 1, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 1, type: dt.TurnRightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 9, y: 1, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 10, y: 1, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 2, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 2, y: 2, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 2, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 5, y: 2, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 2, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 8, y: 2, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 2, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 10, y: 2, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 3, type: dt.StraightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 1, y: 3, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 3, y: 3, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 4, y: 3, type: dt.TurnRightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 6, y: 3, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 7, y: 3, type: dt.TurnLeftDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 9, y: 3, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 3, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 4, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 2, y: 4, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 3, y: 4, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 5, y: 4, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 4, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 8, y: 4, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 4, type: dt.TurnRightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 4, type: dt.StraightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 0, y: 5, type: dt.TurnRightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 1, y: 5, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 2, y: 5, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 3, y: 5, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 4, y: 5, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 6, y: 5, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 7, y: 5, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 8, y: 5, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 5, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 10, y: 5, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 6, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 6, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 6, type: dt.TurnLeftDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 6, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 6, type: dt.StraightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 8, y: 6, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 6, type: dt.TurnRightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 10, y: 6, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                   { x: 0, y: 7, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 1, y: 7, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 3, y: 7, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 4, y: 7, type: dt.TurnRightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 7, y: 7, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 7, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 10, y: 7, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 8, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 1, y: 8, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 8, type: dt.TurnLeftDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 8, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 8, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 8, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 10, y: 8, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 0, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 9, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 2, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 3, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 4, y: 9, type: dt.TurnLeftDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 7, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 9, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 10, y: 9, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 10, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 1, y: 10, type: dt.StraightDominoPiece, dir: dt.Dir.SE, goal: false },
                   { x: 2, y: 10, type: dt.StraightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 3, y: 10, type: dt.TurnRightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 10, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 8, y: 10, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 9, y: 10, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 10, y: 10, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 11, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 1, y: 11, type: dt.TurnRightDominoPiece, dir: dt.Dir.NE, goal: false },
                   { x: 2, y: 11, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 11, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 4, y: 11, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 6, y: 11, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 7, y: 11, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 9, y: 11, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: false },
                   { x: 10, y: 11, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 0, y: 12, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 1, y: 12, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 2, y: 12, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 3, y: 12, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 4, y: 12, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 5, y: 12, type: dt.Wall, dir: dt.Dir.SW, goal: false },
                   { x: 6, y: 12, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 7, y: 12, type: dt.StraightDominoPiece, dir: dt.Dir.NW, goal: false },
                   { x: 8, y: 12, type: dt.StraightDominoPiece, dir: dt.Dir.SW, goal: false },
                   { x: 9, y: 12, type: dt.Wall, dir: dt.Dir.NW, goal: false },
                   { x: 10, y: 12, type: dt.Wall, dir: dt.Dir.SW, goal: false },
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
dt.LEVELS.push(dt.LEVELOB10);
