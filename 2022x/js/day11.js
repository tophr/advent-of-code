const monkeysEx = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const monkeysInput = ``;

const monkeysArray = monkeysInput.split("\n\n");
const monkeys = {};

// monkeysArray.forEach((monkeyLine, i) => {
//     let monkeyLines = monkeyLine.split("\n");
//     let monkey = monkeyLines[0].split(":")[0];
//     monkeys[monkey] = {}; //monkeyLines[0];
//     let starting = monkeyLines[1].split(": ");
//     monkeys[monkey]["start"] = starting[1].split(", ").map(Number);
//     let operation = monkeyLines[2].split(": ");
//     monkeys[monkey]["operation"] = operation[1];
//     let test = monkeyLines[3].split(": ");
//     monkeys[monkey]["test"] = {};
//     monkeys[monkey]["test"]["case"] = test[1];
//     let testTrue = monkeyLines[4].split(": ");
//     let testFalse = monkeyLines[5].split(": ");
//     monkeys[monkey]["test"]["true"] = testTrue[1];
//     monkeys[monkey]["test"]["false"] = testFalse[1];
//     monkeys[monkey]["inspections"] = 0;
// });

// console.log(monkeys);

const operators = {
    '+': function(a, b) { return parseInt(a) + parseInt(b) },
    '-': function(a, b) { return a - b },
    '*': function(a, b) { return a * b }
};

// let rounds = 20;
// for ( let i = 0; i < rounds; i++) {

//     Object.keys(monkeys).forEach(monkey => {
//         // console.log(monkey);
//         let items = [...monkeys[monkey].start];
//         let command = monkeys[monkey].operation.split(" ");
//         items.forEach((item, i) => {
//             // console.log(items);
//             let op = command[3];
//             // console.log(isNaN(command[4]));
//             let value = isNaN(command[4]) ? item : command[4];
//             let worrylevel = Math.floor( operators[op](item, value));
//             // console.log(monkey + " inspects an item with a worry level of " + item);
//             // console.log("Worry level is " + op + " by " + value + " to " + worrylevel)
//             worrylevel = Math.floor( worrylevel / 3 );
//             // console.log("Monkey gets bored with item. Worry level is divided by 3 to " + worrylevel);
//             let test = monkeys[monkey].test.case.split(" ")[2];
//             if ( worrylevel%test === 0) {            
//                 let target = monkeys[monkey].test.true.split(" ")[3];
//                 // console.log(monkeys[monkey].test.case + " is true, item " + worrylevel + " is thrown to monkey " + target);
//                 monkeys["Monkey " + target].start.push(worrylevel);
//             } else {            
//                 let target = monkeys[monkey].test.false.split(" ")[3];
//                 // console.log(monkeys[monkey].test.case + " is false, item " + worrylevel + " is thrown to monkey " + target);
//                 monkeys["Monkey " + target].start.push(worrylevel);
//             }
//             monkeys[monkey].inspections++;
//             monkeys[monkey].start.shift();
//         });
//     });
// }

// // console.log(monkeys);

// let inspectionCounts = [];
// Object.keys(monkeys).forEach(monkey => {
//     inspectionCounts.push(monkeys[monkey].inspections);
// });

// const sortedNumbers = inspectionCounts.sort((a, b) => b - a);
// const [first, second] = sortedNumbers.slice(0, 2);
// console.log('solution to part one is ' + first * second);


// Part Two 
// Comment out part one bc I'm lazy 
monkeysArray.forEach((monkeyLine, i) => {
  let monkeyLines = monkeyLine.split("\n");
  let monkey = monkeyLines[0].split(":")[0];
  monkeys[monkey] = {}; //monkeyLines[0];
  let starting = monkeyLines[1].split(": ");
  monkeys[monkey]["start"] = starting[1].split(", ").map(Number);
  monkeys[monkey]["operation"] = monkeyLines[2].split(": ")[1].split(" "); 
  monkeys[monkey]["test"] = {};
  monkeys[monkey]["test"]["case"] = monkeyLines[3].split(": ")[1].split(" ")[2];
  monkeys[monkey]["test"]["true"] =  "Monkey " + monkeyLines[4].split(": ")[1].split(" ")[3];
  monkeys[monkey]["test"]["false"] = "Monkey " + monkeyLines[5].split(": ")[1].split(" ")[3]; //testFalse[1];
  monkeys[monkey]["inspections"] = 0;
});

let rounds = 10000;
let divisors = [];
Object.keys(monkeys).forEach(monkey => {
  divisors.push(monkeys[monkey].test.case);
});
const productOfDivisors = divisors.reduce((acc, cur) => acc * cur, 1);

for ( let i = 0; i < rounds; i++) {
  Object.keys(monkeys).forEach(monkey => {
      let items = [...monkeys[monkey].start];
      let command = monkeys[monkey].operation;
      let op = command[3];
      let test = monkeys[monkey].test.case;
      items.forEach((item, i) => {          
          monkeys[monkey].inspections++;
          let value = isNaN(command[4]) ? item : command[4];
          let worrylevel = Math.floor( operators[op](item, value));
          // Calculate modulo to keep worry level manageable with a computer
          worrylevel = worrylevel % productOfDivisors;
          if ( worrylevel % test === 0 ) {            
              monkeys[monkeys[monkey].test.true].start.push(worrylevel);
          } else {            
              monkeys[monkeys[monkey].test.false].start.push(worrylevel);
          }
          monkeys[monkey].start.shift();
      });
  });
}

console.log(monkeys);

let inspectionCounts = [];
Object.keys(monkeys).forEach(monkey => {
  inspectionCounts.push(monkeys[monkey].inspections);
});

const sortedNumbers = inspectionCounts.sort((a, b) => b - a);
const [first, second] = sortedNumbers.slice(0, 2);
console.log('solution to part two is ' + first * second);