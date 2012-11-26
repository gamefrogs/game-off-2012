dt.LEVELTUT5_STR = 
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
dt.LEVELDEFTUT5 =
  new dt.LevelDef("Forced Passage", 11, 13, dt.LEVELTUT5_STR,
                  [
                   { x: 2, y: 6, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 7, type: dt.StraightDominoPiece, dir: dt.Dir.E, goal: true },
                   { x: 5, y: 7, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 8, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 9, type: dt.StraightDominoPiece, dir: dt.Dir.W, goal: true },
                   { x: 2, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 3, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 4, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 10, type: dt.Wall, dir: dt.Dir.E, goal: false },
                   { x: 2, y: 11, type: dt.StraightEndPiece, dir: dt.Dir.E, goal: true },
                  ],
                  [
                   { type: dt.StraightDominoPiece, limit: 6 },
                   { type: dt.TurnRightDominoPiece, limit: 7 },
                   { type: dt.TurnLeftDominoPiece, limit: 4 },
                  ]);

dt.LEVELDEFTUT5.information = (
  "<p>Goal pieces are not always the final destination, but you have to go through them anyway.</p>" +
    "<p>Once a goal is cleared, the circle around it turns green.</p>"
);
// Register level
dt.LEVELS.push(dt.LEVELDEFTUT5);
