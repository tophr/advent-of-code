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
  console.log(loopLength / 2);
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
console.log(buildLoop(startX, startY));