dt.LEVEL2_STR = 
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     \n" +
  "| 0 . 0 . 0 . 0 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 2 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 2 . 2 . 2 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 2 . 2 . 3 . 4 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _       ";
dt.LEVELDEF2 =
  new dt.LevelDef("Second one", 11, 13, dt.LEVEL2_STR,
                  [{ x: 2, y: 2, type: dt.StraightStartPiece, dir: dt.Dir.NW},
                   { x: 5, y: 5,  type: dt.AnyEndPiece, dir: dt.Dir.NONE, goal: true },
                   { x: 6, y: 10, type: dt.AnyEndPiece, dir: dt.Dir.NONE, goal: true }],
                  [{ type: dt.LForkDominoPiece, limit: 5},
                   { type: dt.RForkDominoPiece, limit: 5}]);

// Register level
dt.LEVELS.push(dt.LEVELDEF2);
