const exCranePlan = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const cranePlan = ``;

// We're doing this manually bc it's gonna be way quicker
// example
// const stack1 = ['Z', 'N'];
// const stack2 = ['M', 'C', 'D'];
// const stack3 = ['P'];

// const stacks = [stack1, stack2, stack3];
// const craneMoves = exCranePlan.split("\n");

// input
const stack1 = ['D', 'B', 'J', 'V'];
const stack2 = ['P', 'V', 'B', 'W', 'R', 'D', 'F'];
const stack3 = ['R', 'G', 'F', 'L', 'D', 'C', 'W', 'Q'];
const stack4 = ['W', 'J', 'P', 'M', 'L', 'N', 'D', 'B'];
const stack5 = ['H', 'N', 'B', 'P', 'C', 'S', 'Q'];
const stack6 = ['R', 'D', 'B', 'S', 'N', 'G'];
const stack7 = ['Z', 'B', 'P', 'M', 'Q', 'F', 'S', 'H'];
const stack8 = ['W', 'L', 'F'];
const stack9 = ['S', 'V', 'F', 'M', 'R'];

const stacks = [stack1, stack2, stack3, stack4, stack5, stack6, stack7, stack8, stack9];
const craneMoves = cranePlan.split("\n");

let stepMoves = [];

craneMoves.forEach((step, i) => {
    let stepArray = step.split(" ").map(Number);
    stepMoves.push( [stepArray[1], stepArray[3], stepArray[5]] );
});

// console.log(stepMoves);

// let finalStack = stacks.slice();
// console.log(finalStack);
// function moveCrates(crateArray, moves) {
//     moves.forEach((step, i) => {
//         let moveCount = step[0];
//         let moveStack = crateArray[step[1] - 1];
//         let moveTarget = crateArray[step[2] - 1];
//         let movedCrates = moveStack.splice( -moveCount, moveCount );
//         movedCrates.reverse();
//         moveTarget.push(...movedCrates);
//     });
//     // console.log(finalStack);
// }

// moveCrates(finalStack, stepMoves);

// let solution = "";
// finalStack.forEach((stack, i) => {
//     solution += stack.pop();
// });
// console.log("solution for part one is " + solution);

// Part two
// this isn't cloning array as expected so comment out part 1 to solve part 2
let finalStack9001 = stacks.slice();
console.log(finalStack9001);
function moveCrates9001(crateArray, moves) {
    moves.forEach((step, i) => {
        let moveCount = step[0];
        let moveStack = crateArray[step[1] - 1];
        let moveTarget = crateArray[step[2] - 1];
        let movedCrates = moveStack.splice( -moveCount, moveCount );
        // movedCrates.reverse();
        moveTarget.push(...movedCrates);
    });
}

moveCrates9001(finalStack9001, stepMoves);

solution = "";
finalStack9001.forEach((stack, i) => {
    solution += stack.pop();
});

console.log("solution for part two is " + solution);
