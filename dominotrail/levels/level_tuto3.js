dt.LEVELTUT3_STR = 
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
dt.LEVELDEFTUT3 =
  new dt.LevelDef("Who To Turn To?", 11, 13, dt.LEVELTUT3_STR,
                  [
                   { x: 4, y: 8, type: dt.StraightEndPiece, dir: dt.Dir.SW, goal: true },
                   { x: 5, y: 8, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                  ],
                  [
                   { type: dt.TurnLeftDominoPiece, limit: 7 },
                   { type: dt.StraightDominoPiece, limit: 5 },
                   { type: dt.TurnRightDominoPiece, limit: 4 },
                  ]);

dt.LEVELDEFTUT3.information = (
  "<p>Those pieces aren't cheap, mind you. That's why we don't always provide an infinite " +
    "supply of each.</p>" +

  "<p>But if you want to get one back, just click the red cross on it.</p>"
);
dt.LEVELDEFTUT3.locked = false;
// Register level
dt.LEVELS.push(dt.LEVELDEFTUT3);
