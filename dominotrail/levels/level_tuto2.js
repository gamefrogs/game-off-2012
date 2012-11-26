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
  "<p>Of course, you will generally have to take turns to reach the goal.</p>" +

  "<p>May we remind you that your right mouse button and the LEFT and RIGHT arrows will " +
    "allow you to rotate a piece before you drop it.</p>" +

  "<p>And use the eraser as much as you want: the removed pieces come back to your box. " +
    "You can also select the eraser with DELETE or BACKSPACE."
);
// Register level
dt.LEVELS.push(dt.LEVELDEFTUT2);
