const path = require('path');
const fsPromise = require('fs').promises;

async function readFile(name) {
    let data = await fsPromise.readFile(path.join(__dirname, name), "utf-8");
    
    
    return data;
}

readFile("input_sample.txt").then(resolved => {
    let data = String(resolved).split('\n');
    // delete last empty line
    data = data.slice(0, data.length - 1);

    console.log(data.length);

    // matrix sorted by first value on each innterval pair
    // [[['2', '4'], ['6', '9']], ...more pairs]
    let matrix = data.map(line => line.split(',')
        .map(pair => pair.split('-')
            .map(v => +v))
                .sort((a,b) => a[0] - b[0]));

    let count = matrix.reduce((acc, curr) => {

        const firstRange = curr[0];
        const secondRange = curr[1];

        // check if secondRange lower bound is in the firstRange
        if(secondRange[0] >= firstRange[0] && secondRange[0] <= firstRange[1]) {
            console.log(curr);
            acc += 1;
            console.log()
        }
        return acc;
    }, 0);

    console.log(count);
});
