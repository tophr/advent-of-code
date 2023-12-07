const recordsEx = `Time:      7  15   30
Distance:  9  40  200`;

const records = ``;

const recordsArray = records.split("\n");
let times = recordsArray[0].split(/\s+/).slice(1);
let distances = recordsArray[1].split(/\s+/).slice(1);

let winningPossibilities = [];
times.forEach((time, i) => {
  let raceTime = parseInt(time);
  let recordDistance = parseInt(distances[i]);
  let holdTime = 0;
  winningPossibilities[i] = []; 
  while (holdTime < raceTime) {  
    let raceDistance = (raceTime - holdTime) * holdTime;
    // console.log(`Time: ${raceTime} Hold: ${holdTime} Distance: ${raceDistance}`);
    if ( raceDistance > recordDistance ) {
      winningPossibilities[i].push(holdTime);
    }
    holdTime++;
  }
});

// console.log(winningPossibilities);
function calculateArrayProduct(arrays) {
  return arrays.reduce((product, array) => product * array.length, 1);
}

const result = calculateArrayProduct(winningPossibilities);
console.log("Part one solution is " + result); 

// Part Two 
let kernTime = recordsArray[0].split(":").slice(1)[0].replace(/\s/g, "");
let kernDistance = recordsArray[1].split(":").slice(1)[0].replace(/\s/g, "");
// console.log(kernTime);
// console.log(kernDistance);

function computePartTwo(time, distance) {
  let raceTime = parseInt(time);
  let recordDistance = parseInt(distance);
  let holdTime = 0;
  let totalPossibilities = 0; 
  while (holdTime < raceTime) {  
    let raceDistance = (raceTime - holdTime) * holdTime;
    // console.log(`Time: ${raceTime} Hold: ${holdTime} Distance: ${raceDistance}`);
    if ( raceDistance > recordDistance ) {
      // winningPossibilities2.push(holdTime);
      totalPossibilities++;
    }
    holdTime++;
  }
  return totalPossibilities++;
}
console.log( "Part two solution is " + computePartTwo(kernTime, kernDistance) );