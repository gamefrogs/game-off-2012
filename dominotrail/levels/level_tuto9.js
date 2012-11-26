dt.LEVELTUT9_STR = 
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
dt.LEVELDEFTUT9 =
  new dt.LevelDef("That's it", 11, 13, dt.LEVELTUT9_STR,
                  [
                   { x: 4, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 0, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 1, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 1, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 1, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 1, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 2, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 3, type: dt.StraightStartPiece, dir: dt.Dir.E, goal: false },
                   { x: 5, y: 3, type: dt.TurnLeftDominoPiece, dir: dt.Dir.SW, goal: true },
                   { x: 6, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 3, type: dt.StraightEndPiece, dir: dt.Dir.SE, goal: true, endAct: 9 },
                   { x: 9, y: 3, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 4, type: dt.TurnLeftDominoPiece, dir: dt.Dir.NE, goal: true },
                   { x: 7, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 4, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 5, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 5, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 5, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 6, type: dt.TurnRightDominoPiece, dir: dt.Dir.NW, goal: true },
                   { x: 4, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 6, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 7, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 7, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 7, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 10, y: 8, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 0, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                    { x: 2, y: 9, type: dt.StraightEndPiece, dir: dt.Dir.W, goal: true, beginAct: 20 },
                   { x: 3, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 9, type: dt.StraightStartPiece, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 9, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 1, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 8, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 9, y: 10, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 2, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 3, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 7, y: 11, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 4, y: 12, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 5, y: 12, type: dt.Wall, dir: dt.Dir.W, goal: false },
                   { x: 6, y: 12, type: dt.Wall, dir: dt.Dir.W, goal: false },
                  ],
                  [
                   { type: dt.TurnLeftDominoPiece, limit: 13 },
                   { type: dt.StraightDominoPiece, limit: 6 },
                   { type: dt.TurnRightDominoPiece, limit: 3 },
                  ]);

dt.LEVELDEFTUT9.information = (
  "<p>You know all the tricks, now you're on your own.</p>" +

  "<p>And if you wonder why it's called <i>Domino Trail</i>, when the graphics look more like " +
    "electrical networks, well... let's say dominos are far more difficult to draw.</p>"
);
// Register level
dt.LEVELS.push(dt.LEVELDEFTUT9);
