const outputEx = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const output = ``;

const outputArray = outputEx.split("\n");

function parseCommands( output ) {
    let commandArr = [];
    let commandPointer = -1;
    output.forEach((line, i) => {
        if ( line.charAt(0) === "$" ) {
            commandPointer++;
            commandArr.push([line]);
        } else {
            commandArr[commandPointer].push(line);
        }
    });
    return commandArr;
}

let outputArrayParsed = parseCommands( outputArray );
// console.log(outputArrayParsed);

function parseOutput( output ) {
    let filesystem = {"/": {}};
    let cwd = "/";
    let directoryPointer = 'filesystem["/"]'; // this isn't really gonna do what i want it to 
    
    output.forEach((line, i) => {
        let lineParse = line[0].split(" ");
        let command = lineParse[1];

        // change directory
        if ( command === "cd" ) {
            let dir = lineParse[2];
            if ( dir === "/" ) {
                cwd = "/";
                directoryPointer = 'filesystem["/"]';
            } else if ( dir === ".." ) {
                let str = directoryPointer.replace(/\[[^\[\]]*\]$/, ""); //directoryPointer.substring(0, str);
                if ( str === "filesystem" ) {
                    directoryPointer = 'filesystem["/"]';
                } else {
                    directoryPointer = str;
                }
                let regex = /\[([^\[\]]*)\]$/;
                cwd = regex.exec(directoryPointer)[1];
            } else {
                cwd = dir;
                if ( cwd === "/") {
                    // nothing 
                } else {
                    let ref = directoryPointer + '["' + dir + '"]';
                    directoryPointer = ref;
                }
            }
        // list files
        } else if ( command === "ls" ) {
            for ( let j = 0; j < line.length; j++) {
                if ( j > 0 ) {
                    let lineArr = line[j].split(" ");
                    if ( lineArr[0] === "dir") {
                        eval(directoryPointer + '["' + lineArr[1] +  '"] = {"type": "dir"}');
                    } else {
                        // eval(directoryPointer + '["' + lineArr[1] + '"] = ' + lineArr[0] + '');
                        eval(directoryPointer + '["' + lineArr[1] + '"] = {"type": "file", "size": ' + lineArr[0] + '}');
                    }
                }
            }
        }

    });

    return filesystem;
}

let filesystem = parseOutput(outputArrayParsed);
console.log(filesystem);

// Build array of sizes present in directory
function getSizes(obj) {
    Object.keys(obj).forEach(file => {
        if ( obj[file].type === "file") {
            if (!obj.sizes) {
                obj.sizes = [];
            }
            obj.sizes.push(obj[file].size);
        } else if (obj[file].type === "dir") {
            getSizes(obj[file]);
        } else {
            if (!obj[file].sizes) {
                obj[file].sizes = [];
            }
        }
    });
}
getSizes(filesystem["/"], 'root');

// Sum totals of current directory 
function nestedDirs(obj) {
    Object.keys(obj).forEach(file => {
        if (obj[file].type === "dir") {
            if (!obj.sizeSubTotal) {
                obj.sizeSubTotal = [];
            }
            if (obj.sizes) {
                let sum = obj.sizes.reduce((a, b) => a + b, 0);
                obj.sizeSubTotal = sum;
            }
            nestedDirs(obj[file]);
        } else {
            if (!obj.sizeSubTotal) {
                obj.sizeSubTotal = [];
            }
            if (obj.sizes) {
                let sum = obj.sizes.reduce((a, b) => a + b, 0);
                obj.sizeSubTotal = sum;
            }
        }
    });
};
nestedDirs(filesystem["/"]);

// Can ya tell I switched to AI here?
// Sum totals of all nested content
function addSizeTotal(obj) {
    // base case: if the object doesn't have a sizeSubTotal property, return
    if (!obj.hasOwnProperty("sizeSubTotal")) return;
  
    // initialize sizeTotal to 0
    let sizeTotal = 0;
  
    // iterate over the object's properties
    for (let prop in obj) {
      // if the property is an object and has a "type" property with value "dir",
      // recursively call the function on it and add its sizeTotal to sizeTotal
      if (typeof obj[prop] === "object" && obj[prop].hasOwnProperty("type") && obj[prop].type === "dir") {
        addSizeTotal(obj[prop]);
        sizeTotal += obj[prop].sizeTotal;
      }  
    }
  
    // add sizeSubTotal to sizeTotal
    sizeTotal += obj.sizeSubTotal;
  
    // add sizeTotal to the object
    obj.sizeTotal = parseInt(sizeTotal);
  }
addSizeTotal(filesystem["/"]);


function findSizeTotalLessThan(obj, sizeTotalThreshold) {
    // base case: if the object doesn't have a sizeTotal property, return
    if (!obj.hasOwnProperty("sizeTotal")) return;
    let sum = 0;
  
    // if the object's sizeTotal is less than or equal to the sizeTotalThreshold and
    // the object has a "type" property with value "dir", add its sizeTotal to sum
    if (obj.sizeTotal <= sizeTotalThreshold && obj.hasOwnProperty("type") && obj.type === "dir") {
        sum += parseInt(obj.sizeTotal);
    }
  
    // iterate over the object's properties
    for (let prop in obj) {
      // if the property is an object, recursively call the function on it and add
      // its return value to sum
        sum += !isNaN(findSizeTotalLessThan(obj[prop], sizeTotalThreshold)) ? parseInt(findSizeTotalLessThan(obj[prop], sizeTotalThreshold)) : 0;
    }
  
    // return the sum
    return sum;
}

let sum = findSizeTotalLessThan(filesystem["/"], 100000);
console.log("solution for part one is " + sum);

// Part Two 
const diskSpace = 70_000_000;
const reqUnused = 30_000_000;
const totalUsed = filesystem["/"].sizeTotal;
const totalFree = diskSpace - totalUsed; 
const reqDif = Math.abs(totalFree - reqUnused);
let directorySizes = [];

function findSizesTotalLessThan(obj, sizeTotalThreshold) {
    // base case: if the object doesn't have a sizeTotal property, return
    if (!obj.hasOwnProperty("sizeTotal")) return;
  
    // if the object's sizeTotal is less than or equal to the sizeTotalThreshold and
    // the object has a "type" property with value "dir", add its sizeTotal to array
    if (obj.sizeTotal >= sizeTotalThreshold && obj.hasOwnProperty("type") && obj.type === "dir") {
        directorySizes.push(parseInt(obj.sizeTotal));
    }
  
    // iterate over the object's properties
    for (let prop in obj) {
      // if the property is an object, recursively call the function on it and add
      // its return value to sum
        let result = !isNaN(findSizesTotalLessThan(obj[prop], sizeTotalThreshold)) ? parseInt(findSizesTotalLessThan(obj[prop], sizeTotalThreshold)) : 0;
    }

    return obj.sizeTotal;
}

findSizesTotalLessThan(filesystem["/"], reqDif);
let uniqueVals = [...new Set(directorySizes)];
console.log("solution to part two is " + Math.min(...uniqueVals));