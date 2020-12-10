const dataEx = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const data = ``;

const dataArray = dataEx.split("\n");
console.log(dataArray);

// function validator( input, numbers, preamble ) {
function validator( numbers, preambleLength ) {
  // check if input is sum of any two non identical values from numbers
  // let preamble =
  let parseData = numbers.slice(preambleLength);
  parseData.forEach( (num, i) => {
    let preamble = numbers.slice(i, preambleLength);
    console.log({parseData});
    console.log({preamble});
    preamble.forEach( (numb, i) => {
      let val = parseInt(num) - parseInt(numb);
      console.log({numb});
      console.log({num});
      console.log({val});
      console.log(preamble.find( val ));
      // if ( preamble.find( val ) !== 0 ) {
      //   console.log( 'pair is ' + val + ' and ' + i);
      // }
    })
  });
}

function parseInput( preamble, data ) {
  i = 0;
  // let parseData = data.splice(0, preamble);
  // console.log(data);
  // data.forEach((datum, i) => {
    // validator( datum, data, preamble);
  // });
};

// parseInput( 5, dataArray );

validator( dataArray, 5);
