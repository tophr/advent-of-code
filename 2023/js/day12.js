const conditionRecordsEx = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const conditionRecords = ``;

const conditions = {
  "." : "operational",
  "#" : "damaged",
  "?" : "unknown",
};

const lines = conditionRecordsEx.split("\n");

lines.forEach((row, i) => {
  let conditions = row.split(" ")[0].split("");
  let damaged = row.split(" ")[1].split(",").map((d) => parseInt(d));
  lines[i] = {
    conditions,
    damaged,
  };
});

console.log(lines);

function computePossibilities(line) {
  let possibilities = [];
  let conditions = line.conditions;
  console.log(conditions);
  let damaged = line.damaged;

  // Find how many permutations of line there are by swapping ? for # in contiguous groups as defined by damaged
  let possible = true;
  let possibleLine = conditions.slice();
  let damagedIndex = 0;
  console.log(conditions.length);
  for (let i = 0; i < conditions.length; i++) {
    if (possibleLine[i] === "?") {
      // console.log(`found ? at ${i}`);
      let swapped = false;
      for (let j = i; j < damaged[damagedIndex]; j++) {
        let damagedCount = 0;
        if (possibleLine[j] === "#") {
          damagedCount++;
        } else if ( possibleLine[j] === "?" ) {
          possibleLine[j] = "#";
          damagedCount++;
          swapped = true;
        } 
        if (damagedCount === damaged[damagedIndex]) {
          damagedIndex++;
          console.log(`damagedIndex is now ${damagedIndex}`);
          // break;
        }
      };
      if (!swapped) {
        possibleLine[i] = ".";
      }
    }
  };
  console.log(possibleLine);
  return possibilities;
}

let possibilitiesSum = 0;
lines.forEach((line, i) => {
  let possibilities = computePossibilities(line);
  possibilitiesSum += possibilities.length;
  console.log(`row ${i} has ${possibilities.length} possibilities`);
});

console.log(`solution for part one is ${possibilitiesSum}`);