const exDatastream = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;
const exDatastream2 = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
const exDatastream3 = `nppdvjthqldpwncqszvftbrmjlhg`;
const exDatastream4 = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
const exDatastream5 = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;

const datastream = ``;

// const dataArray = exDatastream.split("");
const dataArray = datastream.split("");

function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}

dataArray.every((char, i) => {    
    if ( i > 3 ) {
        let fourArray = [char, dataArray[i - 1], dataArray[i - 2], dataArray[i - 3]];
        // console.log(i);
        if ( checkIfDuplicateExists(fourArray) !== true ) {
            // console.log(fourArray);
            console.log('marker is at ' + (i + 1));
            return false;
        }
    }
    return true;
});

dataArray.every((char, i) => {    
    if ( i > 13 ) {
        let thirteenArray = [char, dataArray[i - 1], dataArray[i - 2], dataArray[i - 3], dataArray[i - 4], dataArray[i - 5], dataArray[i - 6], dataArray[i - 7], dataArray[i - 8],dataArray[i - 9], dataArray[i - 10], dataArray[i - 11], dataArray[i - 12], dataArray[i - 13]];
        if ( checkIfDuplicateExists(thirteenArray) !== true ) {
            console.log('message is at ' + (i + 1));
            return false;
        }
    }
    return true;
});
