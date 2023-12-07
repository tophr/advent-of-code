const handsEx = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const hands = ``;

const handsArray = handsEx.split("\n").map(hand => hand.split(" "));
console.log(handsArray);
const labels = ['A', 'K', 'Q', 'J', 'T', 9, 8, 7, 6, 5, 4, 3, 2].reverse();
let totalWinnings = 0;
let handsArraySorted = [];

handsArray.forEach((hand, i) => {
  let cards = hand[0].split("");
  let bid = hand[1];
  // Count duplicate cards
  let counts = {};
  cards.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
  console.log(`hand ${i} duplicate count ${JSON.stringify(counts)}`);
  handsArraySorted.push({ hand: cards, counts: counts, bid: bid });
});

console.log(handsArraySorted);