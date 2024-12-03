const locationsEx = `3   4
4   3
2   5
1   3
3   9
3   3`;

const locations = ``;

const locationsArray = locationsEx.split("\n");
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