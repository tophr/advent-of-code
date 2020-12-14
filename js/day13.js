const notesEx = `939
7,13,x,x,59,x,31,19`;

const notes = `1001171
17,x,x,x,x,x,x,41,x,x,x,37,x,x,x,x,x,367,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,19,x,x,x,23,x,x,x,x,x,29,x,613,x,x,x,x,x,x,x,x,x,x,x,x,13`;

const notesArray = notes.split("\n");
console.log(notesArray);

let timestamp = notesArray[0];
const busIds = notesArray[1].split(',').filter(id => id !== 'x').map(Number);
console.log(busIds);

// let busTimes = {};
let busTimes = [];

busIds.forEach((id, i) => {
  // console.log( notesArray[0] );
  let prevTimeDif = timestamp % id;
  let nextTime = ( timestamp - prevTimeDif ) + id;
  // busTimes[i] = { id: id, time: nextTime };
  busTimes.push(nextTime);
  console.log(nextTime)
});

let earliestTime = Math.min(...busTimes);

//This is silly
let busIdIndex = busTimes.findIndex(i => i === earliestTime);
let busId = busIds[busIdIndex];
let answer1 = ( earliestTime - timestamp ) * busId;
console.log('the answer for part 1 is ' + answer1);
