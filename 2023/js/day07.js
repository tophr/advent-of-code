const handsEx = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const hands = ``;

const handsArray = hands.split("\n").map(hand => hand.split(" "));
console.log(handsArray);
const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();
const types = ["Five of a kind", "Four of a kind", "Full house", "Three of a kind", "Two pair", "One pair", "High card"].reverse();
let totalWinnings = 0;
let handsArrayPresorted = [];

handsArray.forEach((hand, i) => {
  let cards = hand[0].split("");
  let bid = hand[1];
  // Count duplicate cards
  let counts = {};
  let type = "";
  cards.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
  // Find highest count
  let highestCount = 0;
  Object.keys(counts).forEach((key) => {
    if (counts[key] > highestCount) {
      highestCount = counts[key];
    } 
  });
  // Set type 
  if (highestCount === 5) {
    type = "Five of a kind";
  } else if (highestCount === 4) {
    type = "Four of a kind";
  } else if (highestCount === 3) {
    if (Object.keys(counts).length === 2) {
      type = "Full house";
    } else {
      type = "Three of a kind";
    }
  } else if (highestCount === 2) {
    if (Object.keys(counts).length === 3) {
      type = "Two pair";
    } else {
      type = "One pair";
    }
  } else {
    type = "High card";
  }

  handsArrayPresorted.push({ hand: cards, counts: counts, bid: bid, type: type });
});

let handsArraySorted = [];
// Sort handsArrayPresorted by type and if type is the same, by highest card
types.forEach((type) => {
  let handBuffer = [];
  handsArrayPresorted.forEach((hand) => {
    if (hand.type === type) {
      handBuffer.push(hand);
    }
  });
  if (handBuffer.length > 0) {
    // Sort handBuffer based on value of handBuffer[i].hand, starting with first card but continuing to next card if equal
    handBuffer.sort((a, b) => {
      for (let i = 0; i < a.hand.length; i++) {
        if (labels.indexOf(a.hand[i]) > labels.indexOf(b.hand[i])) {
          return 1;
        } else if (labels.indexOf(a.hand[i]) < labels.indexOf(b.hand[i])) {
          return -1;
        }
      }
      return 0;
    });
    console.log({handBuffer});
    //Add handBuffer to handsArraySorted
    handBuffer.forEach((hand) => {
      handsArraySorted.push(hand);
    });
  }
});

// Calculate winnings
handsArraySorted.forEach((hand, i) => {
  totalWinnings += hand.bid * (i + 1);
});

console.log(`totalWinnings ${totalWinnings}`);

// Part Two 
const labels2 = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();
let handsArrayPresorted2 = [];
handsArray.forEach((hand, i) => {
  let cards = hand[0].split("");
  let bid = hand[1];
  // Count duplicate cards
  let counts = {};
  let type = "";
  cards.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
  // Count jokers
  let jokers = 0;
  cards.forEach((x) => { if (x === "J") { jokers++; } });
  // Find highest count
  let highestCount = 0;
  Object.keys(counts).forEach((key) => {
    if (key !== "J" && counts[key] > highestCount) {
      highestCount = counts[key];
    } 
  });
  // Add jokers to highestCount
  highestCount += jokers;
  // Set type 
  if (highestCount === 5) {
    type = "Five of a kind";
  } else if (highestCount === 4) {
    type = "Four of a kind";
  } else if (highestCount === 3) {
    if (Object.keys(counts).length === 2 || (Object.keys(counts).length === 3 && jokers > 0)) {
      type = "Full house";
    } else {
      type = "Three of a kind";
    }
  } else if (highestCount === 2) {
    if (Object.keys(counts).length === 3 || (Object.keys(counts).length === 4 && jokers > 0)) {
      type = "Two pair";
    } else {
      type = "One pair";
    }
  } else {
    type = "High card";
  }

  handsArrayPresorted2.push({ hand: cards, counts: counts, bid: bid, type: type });
});

let handsArraySorted2 = [];
// Sort handsArrayPresorted by type and if type is the same, by highest card
types.forEach((type) => {
  let handBuffer = [];
  handsArrayPresorted2.forEach((hand) => {
    if (hand.type === type) {
      handBuffer.push(hand);
    }
  });
  if (handBuffer.length > 0) {
    // Sort handBuffer based on value of handBuffer[i].hand, starting with first card but continuing to next card if equal
    handBuffer.sort((a, b) => {
      for (let i = 0; i < a.hand.length; i++) {
        if (labels2.indexOf(a.hand[i]) > labels2.indexOf(b.hand[i])) {
          return 1;
        } else if (labels2.indexOf(a.hand[i]) < labels2.indexOf(b.hand[i])) {
          return -1;
        }
      }
      return 0;
    });
    console.log({handBuffer});
    //Add handBuffer to handsArraySorted
    handBuffer.forEach((hand) => {
      handsArraySorted2.push(hand);
    });
  }
});
console.log({handsArraySorted2});
// Calculate winnings
let totalWinnings2 = 0;
handsArraySorted2.forEach((hand, i) => {
  totalWinnings2 += hand.bid * (i + 1);
});

console.log(`totalWinnings ${totalWinnings2}`);