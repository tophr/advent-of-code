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
let start = 'AAA'; 
let end = 'ZZZ';  
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
    // console.log(direction);
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

while ( destination !== end) {
  destination = navigate(destination);
}
