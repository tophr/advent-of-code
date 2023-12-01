const inputEx = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const input1a = ``;

const exArray = inputEx.split("\n\n"); 
const input1Array = input1a.split("\n\n");

// Part One
let totalArray = [];
// const funArray = exArray;
const funArray = input1Array;

funArray.forEach((bar, i) => {
  let subarr = bar.split("\n").map( Number );
  const sum = subarr.reduce((partialSum, a) => partialSum + a, 0);
  totalArray.push(sum);
});

// console.log({totalArray});
console.log('solution one is ' + Math.max(...totalArray));

// Part Two
function findLargest3(inputArray) {
  inputArray.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
  
  // console.log(inputArray + "/******/" + inputArray[0] + "/" + inputArray[1] + "/" + inputArray[2]);  
  let top3 = inputArray.slice(0, 3);
  // console.log(top3);
  const sum = top3.reduce((partialSum, a) => partialSum + a, 0);
  console.log('solution two is ' + sum);
}

findLargest3(totalArray);
