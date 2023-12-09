const mapsEx = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const mapsEx2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const mapsEx3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const maps = ``;

const mapsArray = maps.split("\n");
const directions = mapsArray[0].split("");
const nodes = mapsArray.slice(2);

console.log(directions);

nodes.forEach((node, i) => {
  nodes[i] = {};
  nodes[i].name = node.split(" = ")[0];
  nodes[i].left = node.split(" = ")[1].split(", ")[0].slice(1);
  nodes[i].right = node.split(" = ")[1].split(", ")[1].slice(0, -1);
});
console.log(nodes);

let steps = 0;
let start = "AAA";
let end = "ZZZ";
let destination;
let startIndex = 0;
// Find index of element in nodes array where name equals start
nodes.forEach((node, i) => {
  if (node.name === start) {
    startIndex = i;
  }
});
let newIndex = 0;

function navigate(destination) {
  directions.forEach((direction, i) => {
    if (direction === "R") {
      steps += 1;
      // Find element in nodes array where name equals right
      nodes.forEach((node, i) => {
        if (node.name === nodes[startIndex].right) {
          destination = nodes[startIndex].right;
          newIndex = i;
          // console.log(`[${startIndex}] ${nodes[startIndex].name} | R: ${nodes[startIndex].right} -> [${newIndex}]${destination}`);
        }
      });
      startIndex = newIndex;
    } else if (direction === "L") {
      steps += 1;
      nodes.forEach((node, i) => {
        if (node.name === nodes[startIndex].left) {
          destination = nodes[startIndex].left;
          newIndex = i;
          // console.log(`[${startIndex}] ${nodes[startIndex].name} | L: ${nodes[startIndex].left} -> [${newIndex}]${destination}`);
        }
      });
      startIndex = newIndex;
    }
    if (destination === end) {
      console.log(steps);
      return;
    }
  });
  return destination;
}

while (destination !== end) {
  destination = navigate(destination);
}

// Part Two
// Pulling from https://github.com/ccozad/advent-of-code/blob/master/day-8.js
const part2StartingNodes = [];
const nodeMap = {};
// Setting the name as the key is smart, good job person I pulled this from
nodes.forEach((node, i) => {
  nodeMap[node.name] = {
    name: node.name,
    left: node.left,
    right: node.right,
  };
  if (node.name.slice(-1) === "A") {
    part2StartingNodes.push(node.name);
  }
});
console.log(nodeMap);

let allPaths = [];
for (let i = 0; i < part2StartingNodes.length; i++) {
  allPaths.push(part2StartingNodes[i]);
}

function calculatePathToGoal(start, sequence) {
  let sequenceIndex = 0;
  let goalFound = false;
  let moves = [];
  moves.push(start);
  let nodeName;
  let leftName;
  let rightName;

  while (!goalFound) {
    nodeName = moves[moves.length - 1];
    leftName = nodeMap[nodeName].left;
    rightName = nodeMap[nodeName].right;

    if (nodeName.endsWith("Z")) {
      goalFound = true;
      break;
    }

    if (directions[sequenceIndex] == "L") {
      moves.push(leftName);
    } else if (sequence[sequenceIndex] == "R") {
      moves.push(rightName);
    }

    if (sequenceIndex < directions.length - 1) {
      sequenceIndex++;
    } else {
      sequenceIndex = 0;
    }
  }

  return moves;
}

let pathCycleLengths = [];
allPaths.forEach((path, i) => {
  let pathTotal = calculatePathToGoal(path, directions);
  pathCycleLengths.push(pathTotal.length - 1);
});

// Reddit says LCM and nothing matters anymore so just borrowing other people's code
function lcm(numbers) {
  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}
console.log(pathCycleLengths);
let moveCount = lcm(pathCycleLengths);
console.log(`Part 2 solution: ${moveCount}`);
