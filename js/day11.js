const seatLayoutEx = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const seatLayout = ``;

const seatLayoutArray = seatLayoutEx.split("\n");

seatLayoutArray.forEach((row, i) => {
  seatLayoutArray[i] = row.split("");
});

console.log(seatLayoutArray);

function seatFill( seats ) {
  let seatPlan = seats;
  seats.forEach((row, i) => {
    row.forEach((seat, j) => {
      if ( seat === '.' ) {
        return;
      } else {
        // let seatStatus = 0;
        let adjFilledSeats = 0;
        let adjSeats = [];
        adjSeats.push( row[i - 1][j-1], row[i - 1][j], row[i - 1][j + 1], row[i][j - 1], row[i][j + 1], row[i + 1][j-1], row[i + 1][j], row[i + 1][j + 1] )
        adjSeats.forEach((item, i) => {
          if ( item === '#') {
            adjFilledSeats++;
          }
        });
        if ( adjFilledSeats === 0 && seat === 'L' ) {
          // seatStatus = 1;
          seatPlan[i][j] = '#';
        }
        if ( adjFilledSeats >= 4 && seat === '#' ) {
          // seatStatus = 0;
          seatPlan[i][j] = 'L';
        }
      }
    });
  });
  return seatPlan;
}

console.log(seatFill(seatLayoutArray));
