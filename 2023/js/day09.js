const historiesEx = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const histories = ``;

// Convert to numeric
const lines = histories.split("\n");

const differenceMaps = [];

function findDifferences(line) {
  let differences = [];
  line.forEach((number, i) => {
    if (i > 0) {
      differences.push(number - line[i - 1]);
    }
  });
  return differences;
}

lines.forEach((line, i) => {
  lines[i] = line.split(" ").map((number) => parseInt(number));
  differenceMaps[i] = [];
  let differences = findDifferences(lines[i]);
  let allZeros = false;
  while (allZeros === false) {
    differenceMaps[i].push(differences);
    differences = findDifferences(differences);
    allZeros = true;
    differences.forEach((difference) => {
      if (difference !== 0) {
        allZeros = false;
      }
    });
    if (allZeros === true) {
      differenceMaps[i].push(differences);
    }
  }
});

console.log({ differenceMaps });
let sum = 0;
let differencePredictions = JSON.parse(JSON.stringify(differenceMaps));
differencePredictions.forEach((differenceMap, i) => {
  differencePredictions[i] = differenceMap.reverse();
  differencePredictions[i].push(lines[i]);
  differencePredictions[i].forEach((difference, j) => {
    if (j === 0) {
      differencePredictions[i][j].push(0);
    } else {
      let lastNumber = difference[difference.length - 1];
      let prevArrayLastNumber = differencePredictions[i][j - 1][difference.length - 1];
      console.log({ lastNumber, prevArrayLastNumber });

      let result = parseInt(lastNumber) + parseInt(prevArrayLastNumber);
      differencePredictions[i][j].push(result);
      if (j === differencePredictions[i].length - 1) {
        sum += result;
      }
    }
  });
});

console.log({ differencePredictions });
console.log(sum);
