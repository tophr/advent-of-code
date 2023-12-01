const program1 = `noop
addx 3
addx -5`;

const program2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const program = ``;
const instructions = program.split("\n");

let x = 1;
let cycles = [x];

instructions.forEach((exec, i) => {
    exec = exec.split(" ");
    if ( exec[0] === 'noop' ) {
        cycles.push(x);
    } else if ( exec[0] === 'addx' ) {
        cycles.push(x);
        cycles.push(x);
        x += parseInt(exec[1]);
    }
});
cycles.push(x);

console.log(cycles);

let signalStrengths = [];
cycles.forEach((cycle, i) => {
    if ( i > 19) {
        if (i % 40 === 0 + 20){
            signalStrengths.push( i * cycle );
        }
    }
});
const sum = signalStrengths.reduce((partialSum, a) => partialSum + a, 0);
console.log('solution for part one is ' + sum);

let output = [];
let row = "";
cycles.forEach((x, i) => {
    if ( i > 0) {
        if ( x + 1 <= ( (i % 40) + 1) && x + 1 >= ( (i % 40) - 1) ) {
            row += "#";
        } else {
            row += ".";
        }
        if (i % 40 === 0){
            output.push(row);
            row = "";
        }
    }
});
console.log(output);