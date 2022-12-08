const fs = require('fs');
const path = require('path');

const readFile = name => {
    const data = fs.readFileSync(path.join(__dirname, name), "utf-8")
        .split('\n');
    return data.splice(0, data.length - 1);
}

const input = readFile("input_sample.txt");
const matrix = input.map(str => str.split('').map(char => +char));
const rowLength = matrix.length;
const colLength = matrix[0].length;
console.log(matrix);

