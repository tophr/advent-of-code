const mapEx = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const map = ``;

const heights = mapEx.split("\n");

heights.forEach((row, i) => {
    const rowArray = row.split("");
    rowArray.forEach((height, i) => {
        let heightVal = height.charCodeAt(0) - 96;
        if (height === "S") {
            heightVal = 0;
        } else if (height === "E") {
            heightVal = 27;
        }
        rowArray[i] = heightVal;
    });
    heights[i] = rowArray;
});

console.log(heights);

// Move through the heights checking for adjacent values that are lower or at most one more. Collect all paths and return the shortest one.




function mapRoute(heights) {
    let x = 0;
    let y = 0;
    let total = 0;
    let route = [];
    while (x < heights[0].length - 1) {
        let currentHeight = heights[x][y];
        let upHeight = heights[x][y - 1];
        let rightHeight = heights[x + 1][y];
        let downHeight = heights[x][y + 1];
        let leftHeight = heights[x - 1][y];
        if (rightHeight < currentHeight) {
            x++;
            total += currentHeight - rightHeight;
        } else if (downHeight < currentHeight) {
            y++;
            total += currentHeight - downHeight;
        } else if (upHeight < currentHeight) {
            y--;
            total += currentHeight - upHeight;
        } else {
            break;
        }
    }
    return route;
}

console.log(mapRoute(heights));