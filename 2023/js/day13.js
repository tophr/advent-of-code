const patternsEx = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const patternTest = `...#..##.########
...#...#.########
#...#.#######..#.
.####.#.#..#...#.
.#.#.###.....#.##
..##.#.#.#..##...
..##.#.#.#..##...
.#.#.###.....#.##
.####.#.#..#...#.`;

const patterns = ``;

const lines = patterns.split("\n\n").map(line => line.split("\n"));
console.log(lines);

function findColReflection(row) {
  let reflectedIndices = [];
  for (let i = 1; i < row.length; i++) {
    let left = row.slice(0, i).split("").reverse().join("");
    let right = row.slice(i, row.length);
    // console.log(left, right);
    // Check if left and right are identical for length of the shorter string
    let shorterLength = left.length < right.length ? left.length : right.length;
    let leftTrim = left.slice(0, shorterLength);
    let rightTrim = right.slice(0, shorterLength);
    if ( leftTrim === rightTrim ) {
      // console.log(`Match found at index ${i} for ${leftTrim} and ${rightTrim}`);
      reflectedIndices.push(i);
    }
  };
  // console.log(reflectedIndices);
  return reflectedIndices;
}

function findRowReflection(pattern) {
  let reflectedIndices = [];
  for (let i = 1; i < pattern.length; i++) {
    let top = pattern.slice(0, i).reverse();
    let bottom = pattern.slice(i, pattern.length);
    // console.log(top, bottom);
    // Check if top and bottom are identical for length of the shorter array
    let shorterLength = top.length < bottom.length ? top.length : bottom.length;
    let topTrim = top.slice(0, shorterLength);
    let bottomTrim = bottom.slice(0, shorterLength);
    // console.log(topTrim, bottomTrim);
    if ( topTrim.join("") === bottomTrim.join("") ) {
      reflectedIndices.push(i);
    }
  };
  return reflectedIndices;
}

function findReflections(pattern, index) {
  let reflectedColIndices = [];
  for (let i = 0; i < pattern.length; i++) {
    let reflections = findColReflection(pattern[i]);
    if (reflections.length > 0) {
      // If no values exist in reflectedIndices, push the values of reflections. Otherwise, remove any values that exist in reflectedIndices but not in reflections
      if (i === 0) {
        reflectedColIndices = reflections;
      } else {
        reflectedColIndices = reflectedColIndices.filter(value => reflections.includes(value));
      }
    } else {
      // console.log("No reflections found");
      reflectedColIndices = [];
      break;
    }
  }

  let summary = {
    pattern: index,
    colIndex: reflectedColIndices,
    rowIndex: findRowReflection(pattern)
  };
  return summary;
}

let reflectionSummaries = [];
lines.forEach((pattern, i) => {
  reflectionSummaries.push( findReflections(pattern, i) );
});

console.log(reflectionSummaries);

// Calculate totals 
let summaryTotal = 0;
reflectionSummaries.forEach(summary => {
  if (summary.colIndex.length > 0) {
    for (let i = 0; i < summary.colIndex.length; i++) {
      summaryTotal += parseInt(summary.colIndex[i]);
    }
  }
  if (summary.rowIndex.length > 0) {
    for (let i = 0; i < summary.rowIndex.length; i++) {
      summaryTotal += parseInt(summary.rowIndex[i]) * 100;
    }
  }
});
console.log("Solution for part 1 is " + summaryTotal);
// 43053 is too high 