const fs = require('fs');
const path = require('path');

// part 2
/*const values = {
    'A' : 1,
    'B' : 2,
    'C' : 3,
    'X' : 1,
    'Y' : 2,
    'Z' : 3
}
let score = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8").toString()
    .split("\n").map(turn => turn.split(" ")).map(value => {
        let total = 0;
        if(values[value[0]] === values[value[1]]) {
            total = values[value[1]] + 3;
        } else if (values[value[0]] == 1 && values[value[1]] == 2) {
            total = values[value[1]] + 6;
        } else if (values[value[0]] == 1 && values[value[1]] == 3) {
            total = values[value[1]];
        } else if (values[value[0]] == 3 && values[value[1]] == 1) {
            total = values[value[1]] + 6;
        } else if (values[value[0]] == 3 && values[value[1]] == 2) {
            total = values[value[1]];
        } else if (values[value[0]] == 2 && values[value[1]] == 3) {
            total = values[value[1]] + 6;
        } else if (values[value[0]] == 2 && values[value[1]] == 1) {
            total = values[value[1]];
        }
        return total;
    });
    
console.log(score.slice(0, score.length - 1).reduce((acc, curr) => acc + curr, 0));*/


// part2
console.log(
fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8").toString().split("\n")
    .reduce((acc, cur) => {
        scores = {'A X':3,'A Y':4,'A Z':8,'B X':1,'B Y':5,'B Z':9,'C X':2,'C Y':6,'C Z':7};
        return acc + (scores[cur] || 0)
    }, 0)
);

