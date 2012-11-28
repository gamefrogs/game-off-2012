dt.LEVELTUT2_STR = 
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
dt.LEVELDEFTUT2 =
  new dt.LevelDef("Nice Curves", 11, 13, dt.LEVELTUT2_STR,
                  [
                   { x: 5, y: 7, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true },
                  ],
                  [
                   { type: dt.TurnRightDominoPiece, limit: Infinity },
                   { type: dt.TurnLeftDominoPiece, limit: Infinity },
                   { type: dt.StraightDominoPiece, limit: Infinity },
                  ]);

dt.LEVELDEFTUT2.information = (
  "<p>Of course, you can't always reach your destination by going in a straight line.</p>" +

  "<p>Select the appropriate pieces from the box on the left, or using the UP and DOWN arrows " +
    "to cycle through them.</p>"
);
// Register level
dt.LEVELS.push(dt.LEVELDEFTUT2);
