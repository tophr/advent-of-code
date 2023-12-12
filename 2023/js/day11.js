const galaxyEx = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const galaxy = ``;

const lines = galaxyEx.split("\n");
let galaxyCount = 1;
let emptyRows = [];
// Create emptyCols array and fill it with numbers from 0 to lines[0].length - 1
let emptyCols = [];
for (let i = 0; i < lines[0].length; i++) {
  emptyCols.push(i);
}

lines.forEach((line, i) => {
  // Check if line contains # 
  if (line.indexOf("#") === -1) {
    emptyRows.push(i);
  }

  let newLine = line.split("");
  newLine.forEach((char, j) => {
    if (char === "#") {
      newLine[j] = galaxyCount;
      galaxyCount++;
      if (emptyCols.indexOf(j) !== -1) {
        emptyCols.splice(emptyCols.indexOf(j), 1);
      }
    } 
  });
  lines[i] = newLine;
});

console.log(lines);
console.log(emptyRows);
console.log(emptyCols);

// Expand galaxy doubling the amount of . for each empty row and column
let newGalaxy = [];
emptyRows.reverse();
emptyCols.reverse();
// Double the columns
lines.forEach((line, i) => {
  emptyCols.forEach((col, j) => {
    // Add "." to line at position col
    lines[i].splice(col, 0, ".");
  });
});
// Double the rows
emptyRows.forEach((row, i) => {
  let newRow = [];
  for (let j = 0; j < lines[0].length; j++) {
    newRow.push(".");
  }
  lines.splice(row, 0, newRow);
});

console.log(lines);

// Map coordinates of each galaxy
let galaxyMap = [];
lines.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char !== ".") {
      galaxyMap.push({x: j, y: i, galaxy: char});
    }
  });
});
console.log(galaxyMap);