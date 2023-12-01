const fooEx = `A Y
B X
C Z`;

const foo = ``;

// const fooArray = fooEx.split("\n");
const fooArray = foo.split("\n");
console.log(fooArray);

// A beats Z
// B beats X
// C beats Y

// A draws X
// B draws Y
// C draws Z

// A loses Y
// B loses Z
// C loses X

function winCompute(input) {
    let round = input.split(" ");
    let score = 0;    
    if (round[1] == 'X') {
        score += 1;
    } else if (round[1] == 'Y') {
        score += 2;
    } else if (round[1] == 'Z') {
        score += 3;
    }
    // loses 
    if ( (round[0] == 'A' && round[1] == 'Z') || (round[0] == 'B' && round[1] == 'X') || (round[0] == 'C' && round[1] == 'Y') ) {
        score += 0;
    } 
    // wins
    else if ( (round[0] == 'A' && round[1] == 'Y') || (round[0] == 'B' && round[1] == 'Z') || (round[0] == 'C' && round[1] == 'X') ) {
        score += 6;
    } 
    // draws
    else if ( (round[0] == 'A' && round[1] == 'X') || (round[0] == 'B' && round[1] == 'Y') || (round[0] == 'C' && round[1] == 'Z') ) {
        score += 3;
    }  
    // console.log({score});
    return score;
}

let totalScore = 0;
fooArray.forEach((bar, i) => {
    totalScore += winCompute(bar);
});
console.log('solution to part one is ' + totalScore);

// Part 2
// x lose
// y draw
// z win 

function winReCompute(input) {
    let round = input.split(" ");
    let score = 0;  
    // must lose  
    if (round[1] == 'X') {
        // score += 0;
        if ( round[0] == 'A' ) {
            score += 3; 
        } else if ( round[0] == 'B' ) {
            score += 1; 
        } else if ( round[0] == 'C' ) {
            score += 2; 
        }
    // must draw
    } else if (round[1] == 'Y') {
        score += 3;
        if ( round[0] == 'A' ) {
            score += 1; 
        } else if ( round[0] == 'B' ) {
            score += 2; 
        } else if ( round[0] == 'C' ) {
            score += 3; 
        }
    // must win 
    } else if (round[1] == 'Z') {
        score += 6;
        if ( round[0] == 'A' ) {
            score += 2; 
        } else if ( round[0] == 'B' ) {
            score += 3; 
        } else if ( round[0] == 'C' ) {
            score += 1; 
        }
    }
    // console.log({score});
    return score;
}

totalScore = 0;
fooArray.forEach((bar, i) => {
    totalScore += winReCompute(bar);
});
console.log('solution to part two is ' + totalScore);