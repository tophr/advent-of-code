const locationsEx = `3   4
4   3
2   5
1   3
3   9
3   3`;

const locations = ``;

const locationsArray = locations.split("\n");
console.log(locationsArray);

const leftList = locationsArray.map((location, i) => {
  const x = location.split("   ");
  return x[0];
});

console.log(leftList);

const rightList = locationsArray.map((location, i) => {
  const x = location.split("   ");
  return x[1];
});

console.log(rightList);

// Sort the lists from smallest to largest
const leftListSorted = leftList.sort((a, b) => a - b);
console.log(leftListSorted);

const rightListSorted = rightList.sort((a, b) => a - b);
console.log(rightListSorted);

const distances = [];

for (let i = 0; i < leftListSorted.length; i++) {
  const distance = Math.abs(leftListSorted[i] - rightListSorted[i]);
  distances.push(distance);
}

console.log(distances);

// Sum the distances
const sum = distances.reduce((acc, curr) => acc + curr, 0);
console.log('The solution to part one is ' + sum);

// Part 2
let similarityScore = 0;
leftList.forEach((left, i) => {
  // Count how many times the left value appears in the right list
  const count = rightList.filter((right) => right === left).length;
  const score = left * count;
  similarityScore += score;
});

console.log('The solution to part two is ' + similarityScore);
