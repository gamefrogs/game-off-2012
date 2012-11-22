dt.LEVEL0_STR = 
  " _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "| 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |    \n" +
  " _ . . . . . . . . . . . . . . . . . . . . . . . _   \n" +
  "  | 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 . 1 |  \n" +
  "   _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     ";
dt.LEVELDEF0 =
  new dt.LevelDef("Level editor", 12, 14, dt.LEVEL0_STR,
                  [],
                  []);
dt.LEVELDEF0.designMode = true;

// Register level
dt.LEVELS.push(dt.LEVELDEF0);