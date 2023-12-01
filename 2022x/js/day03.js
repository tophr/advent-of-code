const exContents = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const contents = ``;

// const contentArray = exContents.split("\n");
const contentArray = contents.split("\n");

let prioritysum = 0;

function computePriority(input) {
    let value = input.charCodeAt(0) - 96;
    if ( value > 0) {
        value = value;
    } else {
        value = input.charCodeAt(0) - 38;
    }
    return value;
}

contentArray.forEach((rucksack, i) => {
    rucksack.split("");
    const half = Math.ceil(rucksack.length / 2);    
    const firstHalf = rucksack.slice(0, half).split("");
    // console.log({firstHalf});
    const secondHalf = rucksack.slice(half).split("");
    const intersection = firstHalf.filter(element => secondHalf.includes(element));
    // console.log(intersection[0]);
    // console.log(computePriority(intersection[0]));
    prioritysum += computePriority(intersection[0]);
});

console.log("solution for part one is " + prioritysum);

// Part 2
prioritysum = 0;

for (var i = 0; i < contentArray.length; i++) {
    // console.log(contentArray[i]);
    if (i%3==0){
        let array1 = contentArray[i + 2].split("");
        let array2 = contentArray[i + 1].split("");
        let array3 = contentArray[i].split("");
        let arrays = [array1, array2, array3];
        const intersection = arrays.shift().filter(function(v) {
            return arrays.every(function(a) {
                return a.indexOf(v) !== -1;
            });
        });
        prioritysum += computePriority(intersection[0]);
    }
}

console.log("solution for part two is " + prioritysum);