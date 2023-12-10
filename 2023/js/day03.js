const schematicEx = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const schematicEx2 = `467..114..
...*......
..35..633.
......#...
617*..*...
.....+.666
..592.....
......755.
...$.*....
.664.598..`;

const schematic = ``;

const schematicArray = schematic.split("\n");

let partNumbers = [];

function findAdjSymbols(x, y) {
  let adjSymbols = false;
  // Top row
  if (y > 0) {
    if (!schematicArray[y - 1][x].match(/[^0-9.]+/)) {
      // partNumbers.push(parseInt(entry));
      adjSymbols = true;
    }
  }
}

schematicArray.forEach((line, i) => {
  let entries = line.split("");
  let numBuffer = [];

  // a dumb hack to add a period to end of each line
  entries.push(".");

  entries.forEach((entry, j) => {
    // Check if entry is a number and then keep checking adjacent entries for numbers until you hit a non-number
    if (entry.match(/\d/)) {
      numBuffer.push(entry);
    } else if (numBuffer.length > 0) {
      // If the entry is not a number, check if the buffer has any numbers in it. If it does, join the numbers in the buffer and push them to 
      let adjSymbols = false;
      // Now let's check for adjacent symbols
      let start = j - numBuffer.length - 1 > 0 ? j - numBuffer.length - 1 : 0;
      let end = j + 1 < entries.length ? j + 1 : entries.length - 1;

      // Top row
      if (i > 0) {
        // search through the row above from start to end index
        let rowAbove = schematicArray[i - 1].slice(start, end);
        if (rowAbove.match(/[^0-9.]+/)) {
          adjSymbols = true;
        }
      }

      // find right adjacent
      if (schematicArray[i][end - 1].match(/[^0-9.]+/)) {
        adjSymbols = true;
      }

      // find left adjacent
      if (schematicArray[i][start].match(/[^0-9.]+/)) {
        adjSymbols = true;
      }

      // Bottom row
      if (i < schematicArray.length - 1) {
        // search through the row below from start to end index
        let rowBelow = schematicArray[i + 1].slice(start, end);
        if (rowBelow.match(/[^0-9.]+/)) {
          adjSymbols = true;
        }
      }
      // Add engine parts to the array
      if (adjSymbols) {
        partNumbers.push(parseInt(numBuffer.join("")));
      }
      // Reset the buffer
      numBuffer = [];
    }
  });
});
// console.log(partNumbers);

// Sum partNumbers array
const sum = partNumbers.reduce((a, b) => a + b, 0);
console.log(sum);

// Part 2
let gearRatios = [];

let numberMap = {};
schematicArray.forEach((line, i) => {
  let match;
  let regex = /\d+/g; // match all groups of digits
  while ((match = regex.exec(line)) !== null) {
    let num = match[0];
    let x = match.index;
    if (!numberMap[i]) {
      numberMap[i] = [];
    }
    let map = {
      num: num,
      x: x,
      y: i,
    };
    numberMap[i].push(map);
  }
});
console.log(numberMap);

function adjNum(x, y) {
  let num = [];
  // Determine if x and y coordinates overlap with any values from numberMap and if so return the number from the key
  if (numberMap[y]) {
    numberMap[y].forEach((map) => {
      // console.log(`x: ${x}, y: ${y}, map.num: ${map.num}, map.num.length: ${map.num.length}, map.x: ${map.x}, map.y: ${map.y}`);
      // 71 >= 
      if (map.x >= x - map.num.length 
        && map.x <= x + 1
        && map.y === y) {
        num.push(map.num);
      }
    });
  }
  return num;
}

schematicArray.forEach((line, i) => {
  let entries = line.split("");

  entries.forEach((entry, j) => {
    // Check if it's a gear
    if (entry === "*") {
      console.log(`Found gear at ${j}, ${i}`);
      let ratios = [];
      // Top row
      if (i > 0) {
        let num = adjNum(j, i - 1);
        if (num) {
          ratios.push(...num);
        }
      }
      // Center row 
      let num = adjNum(j, i);
      if (num) {
        ratios.push(...num);
      }
      // Bottom row
      if (i < schematicArray.length - 1) {
        let num = adjNum(j, i + 1);
        if (num) {
          ratios.push(...num);
        }
      }
      if (ratios.length === 2) {
        console.log("bingo");
        gearRatios.push(ratios[0] * ratios[1]);
      }
      console.log(ratios);
    }
  });
});

const sum2 = gearRatios.reduce((a, b) => a + b, 0);
console.log(sum2);