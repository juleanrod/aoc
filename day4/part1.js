const path = require('path');
const fsPromise = require('fs').promises;

async function readFile(name) {
    let data = await fsPromise.readFile(path.join(__dirname, name), "utf-8");
    return data;
}

readFile("input.txt").then(resolved => {
    let data = String(resolved).split('\n');
    // delete last empty line
    data = data.slice(0, data.length - 1);

    console.log(data.length);

    // matrix sorted by difference between pair ranges, [[[lowest, largest]], ...]
    // [[['2', '4'], ['6', '9']], ...more pairs]
    let matrix = data.map(line => line.split(',')
        .map(pair => pair.split('-')
            .map(v => +v))
                .sort((a,b) => (a[1] - a[0]) - (b[1] - b[0])));


    let count = matrix.reduce((acc, curr) => {
        // find lowest or largest between the ranges
        // from there compare 
        const lowest = curr[0];
        const largest = curr[1];

        if(lowest[0] >= largest[0] && lowest[1] <= largest[1]) {
            console.log(curr);
            acc += 1;
        }
        return acc;
    }, 0);

    console.log(count);
});
