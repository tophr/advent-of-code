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

const lines = galaxy.split("\n");
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

// Create a deep copy of lines
let newGalaxy = [];
lines.forEach((line) => {
  newGalaxy.push(line.slice());
});
emptyRows.reverse();
emptyCols.reverse();
// Double the columns
lines.forEach((line, i) => {
  emptyCols.forEach((col, j) => {
    // Add "." to line at position col
    newGalaxy[i].splice(col, 0, ".");
  });
});
// Double the rows
emptyRows.forEach((row, i) => {
  let newRow = [];
  for (let j = 0; j < lines[0].length; j++) {
    newRow.push(".");
  }
  newGalaxy.splice(row, 0, newRow);
});

console.log(newGalaxy);

// Map coordinates of each galaxy
let galaxyMap = [];
newGalaxy.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char !== ".") {
      galaxyMap.push({x: j, y: i, galaxy: char});
    }
  });
});
console.log("galaxy map one");
console.log(galaxyMap);

function computeDistance(galaxy1, galaxy2) {
  return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}

// Compute distance between each galaxy
let galaxyDistances = [];
for (let i = 0; i < galaxyMap.length; i++) {
  for (let j = i + 1; j < galaxyMap.length; j++) {
    galaxyDistances.push({galaxy1: galaxyMap[i].galaxy, galaxy2: galaxyMap[j].galaxy, distance: computeDistance(galaxyMap[i], galaxyMap[j])});
  }
}
console.log(galaxyDistances);

// Sum distances for each galaxy
let galaxyDistancesSum = 0;
galaxyDistances.forEach((distance) => {
  galaxyDistancesSum += parseInt(distance.distance);
});
console.log("solution for part one is " + galaxyDistancesSum);

// Part Two - this could be much dryer 
// Map coordinates of orginal galaxy
let galaxyMapExpanded = [];
function computeExpandedCoordinates(galaxy, power) {
  let newGalaxy = {x: galaxy.x, y: galaxy.y, galaxy: galaxy.galaxy};
  emptyCols.forEach((col) => {
    if (col < galaxy.x) {
      newGalaxy.x = newGalaxy.x + ( power * 1) - 1;
    }
  });
  emptyRows.forEach((row) => {
    if (row < galaxy.y) {
      newGalaxy.y = newGalaxy.y + ( power * 1 ) - 1;
    }
  });
  return newGalaxy;
}

lines.forEach((line, i) => {
  line.forEach((char, j) => {
    if (char !== ".") {
      galaxyMapExpanded.push( computeExpandedCoordinates({x: j, y: i, galaxy: char}, 1000000));
    }
  });
});
console.log("galaxy map two");
console.log(galaxyMapExpanded);

// Compute distance between each galaxy
let galaxyDistancesExpanded = [];
for (let i = 0; i < galaxyMapExpanded.length; i++) {
  for (let j = i + 1; j < galaxyMapExpanded.length; j++) {
    galaxyDistancesExpanded.push({galaxy1: galaxyMapExpanded[i].galaxy, galaxy2: galaxyMapExpanded[j].galaxy, distance: computeDistance(galaxyMapExpanded[i], galaxyMapExpanded[j])});
  }
}
console.log(galaxyDistancesExpanded);

// Sum distances for each galaxy
let galaxyDistancesSum2 = 0;
galaxyDistancesExpanded.forEach((distance) => {
  galaxyDistancesSum2 += parseInt(distance.distance);
});
console.log("solution for part two is " + galaxyDistancesSum2);