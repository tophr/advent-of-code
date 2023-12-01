const exAssignments = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const assignments = ``;

// const assArray = exAssignments.split("\n");
const assArray = assignments.split("\n");
let count = 0;

assArray.forEach((pair, i) => {
    let pairs = pair.split(",");
    let ids = [];
    pairs.forEach((ass, i) => {
        ids.push(ass.split("-").map(Number));
    });
    // console.log({ids});

    // Does first set exist in second set? 
    if ( ((ids[0][0] >= ids[1][0]) && (ids[0][1] <= ids[1][1])) )  {
        count += 1;
    }
    // Does second set exist in first set? 
    else if ( ((ids[0][0] <= ids[1][0]) && (ids[0][1] >= ids[1][1])) )  {
        count += 1;
    }
});

console.log("solution to part one is " + count);

// Part two
count = 0;
assArray.forEach((pair, i) => {
    let pairs = pair.split(",");
    let ids = [];
    pairs.forEach((ass, i) => {
        ids.push(ass.split("-").map(Number));
    });
    // console.log({ids});

    // Does first set overlap second set? 
    if ( (ids[0][0] <= ids[1][1]) && (ids[0][1] >= ids[1][0]) ) {
        count += 1;
    }
});
console.log("solution to part two is " + count);