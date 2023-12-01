const inputEx = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const inputs = ``;

const input = inputs.split("\n");

// initialize the head and tail positions
let head_x = 0;
let head_y = 0;
let tail_x = 0;
let tail_y = 0;

// initialize a dictionary to keep track of visited positions
let head_visited = {"0, 0": true};
let tail_visited = {"0, 0": true};

// initialize a counter for the number of visited positions
let num_visited = 1;

// loop through each movement in the input
input.forEach((movement, i) => {
    // this isn't working because it needs to step one at a time in moves 
    // parse the direction and distance from the movement
    movement = movement.split(" ");
    let direction = movement[0];
    let distance = parseInt(movement[1]);
    // console.log(movement);
    // move the head in the specified direction
    for ( let i = 0; i < distance; i++) {
        if ( direction == "U") {
            head_y++; // += distance;
        } else if ( direction == "D" ) {
            head_y--; // -= distance;
        } else if ( direction == "L" ) {
            head_x-- // -= distance;
        } else if ( direction == "R" ) {
            head_x++ // += distance;
        }
    

    // don't think this is accounting for the diagonal rule 
    // update the tail position if necessary
    if ( Math.abs(head_x - tail_x) > 1 || Math.abs(head_y - tail_y) > 1 ) {
        if (( head_x > tail_x ) && ( head_y > tail_y )) {
            tail_x += 1;
            tail_y += 1;
        } else if (( head_x < tail_x ) && ( head_y < tail_y )) {
            tail_x -= 1;
            tail_y -= 1;
        } else if (( head_x < tail_x ) && ( head_y > tail_y )) {
            tail_x -= 1;
            tail_y += 1;
        } else if (( head_x > tail_x ) && ( head_y < tail_y )) {
            tail_x += 1;
            tail_y -= 1;
        } else if ( head_x > tail_x ) {
            tail_x += 1;
        } else if ( head_x < tail_x ) {
            tail_x -= 1;
        } else if ( head_y > tail_y ) {
            tail_y += 1;
        } else if ( head_y < tail_y ) {
            tail_y -= 1;
        }
    }

    // mark the current head position as visited
    head_visited[`${head_x}, ${head_y}`] = true;
    tail_visited[`${tail_x}, ${tail_y}`] = true;

    // return the number of visited positions
    // console.log("head " + `${head_x}, ${head_y}`);
    // console.log("tail " + `${tail_x}, ${tail_y}`);
    num_visited += 1;
    // return num_visited;

    }
});

// console.log({num_visited});
// console.log(head_visited);
// console.log(tail_visited);
// Return size of tail_visited 
console.log("solution for part one is " + Object.keys(tail_visited).length);