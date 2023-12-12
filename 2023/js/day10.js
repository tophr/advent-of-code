const mapEx1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const mapEx2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const mapEx3 = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const mapEx4 = `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`;

const mapEx5 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const mapEx6 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const map = ``;

const lines = map.split("\n");
lines.forEach((line, i) => {
  lines[i] = line.split(""); 
});
console.log(lines);

const tiles = {
  "|": { n: 1, e: 0, s: 1, w: 0},
  "-": { n: 0, e: 1, s: 0, w: 1},
  "L": { n: 1, e: 1, s: 0, w: 0},
  "J": { n: 1, e: 0, s: 0, w: 1},
  "7": { n: 0, e: 0, s: 1, w: 1},
  "F": { n: 0, e: 1, s: 1, w: 0},
  ".": { n: 0, e: 0, s: 0, w: 0},
  "S": { n: 1, e: 1, s: 1, w: 1},
  "X": { n: 0, e: 0, s: 0, w: 0}
};

function findStrayTiles(tile, x, y) {
  let connections = 0;
  // Above 
  if (y > 0) {
    if (tiles[tile].n === 1 && tiles[lines[y - 1][x]].s === tiles[tile].n) {
      connections++;
    }
  }
  // Below
  if (y < lines.length - 1) {
    if (tiles[tile].s === 1 && tiles[lines[y + 1][x]].n === tiles[tile].s) {
      connections++;
    }
  }
  // Left
  if (x > 0) {
    if (tiles[tile].w === 1 && tiles[lines[y][x - 1]].e === tiles[tile].w) {
      connections++;
    }
  }
  // Right
  if (x < lines[y].length - 1) {
    if (tiles[tile].e === 1 && tiles[lines[y][x + 1]].w === tiles[tile].e) {
      connections++;
    }
  }
  // console.log(`Tile ${tile} at position ${x}, ${y} has ${connections} connections`);
  if ( connections === 2 ) {
    return true;
  } else {
    return false;
  }
}

lines.forEach((line, i) => {
  line.forEach((tile, j) => {
    if ( findStrayTiles(tile, j, i) === false ) {
      // console.log(`Tile ${tile} at position ${j}, ${i} is stray`);
      lines[i][j] = "X";
    }
  });
});

console.log({lines});

function buildLoop(startX, startY) {
  let loop = [];
  let x = startX;
  let y = startY;
  let tile = lines[y][x];
  let direction = "s";
  let loopComplete = false;
  let loopLength = 0;
  while (loopComplete === false) {
    loop.push({ x: x, y: y, tile: tile });
    // Above 
    if (y > 0 && tiles[tile].n === 1 && tiles[lines[y - 1][x]].s === tiles[tile].n && direction !== "s") {
      direction = "n";
      y--;
      tile = lines[y][x];
    }
    // Below
    else if (y < lines.length - 1 && tiles[tile].s === 1 && tiles[lines[y + 1][x]].n === tiles[tile].s && direction !== "n") {
      direction = "s";
      y++;
      tile = lines[y][x];
    }
    // Left
    else if (x > 0 && tiles[tile].w === 1 && tiles[lines[y][x - 1]].e === tiles[tile].w && direction !== "e") {
      direction = "w";
      x--;
      tile = lines[y][x];
    }
    // Right
    else if (x < lines[y].length - 1 && tiles[tile].e === 1 && tiles[lines[y][x + 1]].w === tiles[tile].e && direction !== "w") {
      direction = "e";
      x++;
      tile = lines[y][x];
    }
    loopLength++;
    if (x === startX && y === startY && loopLength > 1) {
      loopComplete = true;
    }
  }
  return loop;
}

// Calculate start position by finding S tile
let startX = 0;
let startY = 0;
lines.forEach((line, i) => {
  line.forEach((tile, j) => {
    if (tile === "S") {
      startX = j;
      startY = i;
    }
  });
});
console.log({startX, startY});
let loop = buildLoop(startX, startY);
console.log("solution for part one is " + loop.length / 2);

// Calculate the area of the loop using the shoelace formula
function calculateArea(loop) {
  let area = 0;
  for (let i = 0; i < loop.length - 1; i++) {
    area += loop[i].x * loop[i + 1].y - loop[i + 1].x * loop[i].y;
  }
  area += loop[loop.length - 1].x * loop[0].y - loop[0].x * loop[loop.length - 1].y;
  area = Math.abs(area / 2);
  return area;
}

let area = calculateArea(loop);

// Now determine the area inside the loop using Pick's theorem
// https://en.wikipedia.org/wiki/Pick%27s_theorem
// A = i + b/2 - 1
// A = area of the polygon (solved above using shoelace formula)
// i = number of interior points (what we're looking for)
// b = number of boundary points (solved above using buildLoop for part 1)
let i = area - (loop.length / 2) + 1;
console.log("solution for part two is " + i);