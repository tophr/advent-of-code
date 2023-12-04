import * as fs from "fs";

const cardsEx = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cards = fs.readFileSync("../inputs/day04.txt", "utf8");

const cardsArray = cards.split("\n");

// Part One
let totalScore = 0;

cardsArray.forEach((card, i) => {
  const cardArray = card.split(" | ");
  const winningNumbersRaw = cardArray[0].split(" ");
  // Remove first two elements from winningNumbers
  winningNumbersRaw.splice(0, 2);
  const winningNumbers =  winningNumbersRaw.filter(element => element !== "");
  const yourCardRaw = cardArray[1].split(" ");
  const yourCard =  yourCardRaw.filter(element => element !== "");
  // console.log(`Card ${i + 1}: ${winningNumbers} | ${yourCard}`);

  // Find which values from winningNumbers are in yourCard
  const matchingNumbers = winningNumbers.filter(value => yourCard.includes(value));
  // console.log(`Card ${i + 1}: ${matchingNumbers}`);

  // Calculate score by doubling for each entry in matchingNumbers
  let score = 0;
  matchingNumbers.forEach((number, i) => {
    if (i === 0) { 
      score = 1;
    }
    if (i > 0) {
      score = score * 2;
    }
  });
  totalScore += score;
});

console.log(`Total score: ${totalScore}`);

// Part Two
// Adapted from https://github.com/Miodec/aoc2023/blob/master/days/4.ts 
// Ok mostly copied from because I was stuck spinning my whiles on part two even though people said day 4 was easy. Sob. 
function parse(line) {
  const [leftSide, rightSide] = line.split(": ");
  const cardId = parseInt(leftSide.split("Card ")[1], 10);
  const [w, a] = rightSide.replace(/ +/gi, " ").trim().split(" | ");
  const winners = w.split(" ").map((n) => parseInt(n, 10));
  const allNumbers = a.split(" ").map((n) => parseInt(n, 10));

  const ret = {
    cardId,
    winningNumbers: winners,
    allNumbers,
  };

  return ret;
}
const inputData = cardsArray.map(parse);
console.log(inputData);

function part2() {
  const data = inputData;
  let solution = 0;

  const cardMultipliers = [];

  for (let i = 0; i < data.length; i++) {
    cardMultipliers[i] = 1;
  }

  for (const card of data) {
    // console.log(`Checking card ${card.cardId}...`);
    const multiplier = cardMultipliers[card.cardId - 1] ?? 1;
    // console.log(`Card ${card.cardId} has a multiplier of ${multiplier}.`);

    let matchCount = 0;
    for (const winningNumber of card.winningNumbers) {
      if (card.allNumbers.includes(winningNumber)) {
        matchCount++;
      }
    }

    if (matchCount > 0) {
      for (let i = card.cardId; i < card.cardId + matchCount; i++) {
        if (cardMultipliers[i] !== undefined) {
          cardMultipliers[i] += 1 * multiplier;
        } else {
          cardMultipliers[i] = 1;
        }
      }
    }
  }
  solution = cardMultipliers.reduce((prev, current) => prev + current);
  return solution;
}

console.log( "Total scratchcards: " + part2() );
