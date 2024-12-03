const reportsEx = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const reports = ``;

const reportsArray = reportsEx.split("\n");

function safetyCheck(levels, i) {
  let safetyCount = 0;
  // Sort the levels from smallest to largest
  const levelsSorted = levels.slice().sort((a, b) => a - b);
  // Checks if the array changes after sorting
  const isIncreasing = levels.toString() === levelsSorted.toString();
  // Sort the levels from largest to smallest
  const levelsSortedReverse = levels.slice().sort((a, b) => b - a);
  // Checks if the array changes after sorting
  const isDecreasing = levels.toString() === levelsSortedReverse.toString();
  // If the array is increasing or decreasing, increment the safety count
  if (isIncreasing || isDecreasing) {
    if (isIncreasing) {
      console.log("Increasing" + i);
    } else {
      console.log("Decreasing" + i);
    }
    // Ensure that adjacent values in levels differ by at least 1 and at most 3
    let safe = true;
    levels.forEach((level, i) => {
      if (i !== levels.length - 1) {
        const diff = Math.abs(levels[i + 1] - level);
        if (diff < 1 || diff > 3) {
          safe = false;
        }
      }
    });
    if (safe) {
      safetyCount++;
      console.log("Safe " + i);
    }
  }
  return safetyCount;
}

let safetyCount = 0;
reportsArray.forEach((report, i) => {
  const levels = report.split(" ");
  console.log(levels);
  safetyCount += safetyCheck(levels, i);
});

console.log("The solution to part one is " + safetyCount);

// Part 2
let dampenedSafetyCount = 0;

reportsArray.forEach((report, i) => {
  const levels = report.split(" ");
  let safetyCount = 0;
  // Iterate through levels dropping one level at a time
  levels.forEach((level, i) => {
    const levelsCopy = levels.slice();
    levelsCopy.splice(i, 1);
    safetyCount += safetyCheck(levelsCopy, i);
  });
  if ( safetyCount > 0) {
    dampenedSafetyCount ++;
  }
  console.log(dampenedSafetyCount + " " + i);
});

console.log("The solution to part two is " + dampenedSafetyCount);
