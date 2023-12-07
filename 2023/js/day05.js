const almanacEx = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const almanac = ``;

const almanacArray = almanac.split("\n\n");
console.log(almanacArray);

let seeds = almanacArray[0].split(": ")[1].split(" ");
console.log(seeds);
let maps = [];

almanacArray.forEach((rule, i) => {
  if ( i > 0 ) {
    let name = rule.split(" map:")[0].trim();
    let ruleArray = rule.split("\n");
    let rules = [];
    ruleArray.forEach((rule, i) => {
      if ( i > 0 ) {
        rules.push(rule.split(" "));
      }
    });

    maps.push({
      name: name,
      rules: rules
    });
  }
});
console.log(maps);

function processSeed(seed) {
  let seedStart = parseInt(seed);
  let seedDest = parseInt(seed);
  maps.forEach((conversion, i) => {
    conversion.rules.forEach((range, i) => {
      let destStart = parseInt(range[0]);
      let sourceStart = parseInt(range[1]);
      let rangeLength = parseInt(range[2] - 1);
      let location = conversion.name.split("-")[2];
      // Check if seed falls within range
      if ( seedStart >= sourceStart && seedStart <= sourceStart + rangeLength ) {
        // Calculate seed location
        seedDest = destStart + ( seedStart - sourceStart );
        // console.log(`Xseed ${seed} -> ${seedDest} equals ${destStart} plus ${seedStart} minus ${sourceStart}`);
        // console.log(`seed ${seed} -> ${seedStart} is in range ${sourceStart} to ${sourceStart + rangeLength}. ${location}: ${seedDest}`);
      } else {
        // console.log(`seed ${seed} = ${seedStart} is not in range ${sourceStart} to ${sourceStart + rangeLength}. ${location}:  ${seedDest}`);
      }
    });
    seedStart = seedDest
 });
  return seedDest;
}

let seedLocations = [];
seeds.forEach((seed, i) => {  
  seedLocations.push(processSeed(seed));
});
console.log(seedLocations);

// Find the smallest value in the seedLocations array 
const min = Math.min(...seedLocations);
console.log(min)

// Part Two 
let seedRanges = [];
let j =  0;
seeds.forEach((seed, i) => {
  if ( i % 2 !== 0 ) {
    // If index is odd, add end to the last object in seedRanges array
    seedRanges[j].length = parseInt(seed);
    j++;
  } else {
    // If index is even, create a new object with start in seedRanges array
    seedRanges[j] = {start: parseInt(seed)};
  }
});
console.log(seedRanges);

let seedLocation2 = 99999;
seedRanges.forEach((range, h) => {
  // Run processSeed on each range starting from range.start for length of range.end
  for (let i = range.start; i <= (range.start + range.length - 1); i++) {
    // console.log(i);
    let result = processSeed(i);
    // console.log("y" + seedLocation2 + " " + result);
    if ( result < seedLocation2 ) {
      // console.log("xxxx" + result);
      seedLocation2 = result;
    }
  }
});
// Find the smallest value in the seedLocations array 
console.log(seedLocation2);
