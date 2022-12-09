const fs = require('fs');
const path = require('path');

const readFile = name => {
    const data = fs.readFileSync(path.join(__dirname, name), "utf-8")
        .split('\n');
    return data.splice(0, data.length - 1);
}

const input = readFile("input.txt");
const matrix = input.map(str => str.split('').map(char => +char));
const rowLength = matrix.length;
const colLength = matrix[0].length;


const e_w = matrix.map(row => {
    let seen = -1;
    return row.map(v => {
        if(v > seen) {
            seen = v;
            return 1;
        }
        return 0;
    });
});
console.log("View east->west",e_w);

const w_e = matrix.map(row => {
    let seen = -1;
    row = row.reverse();
    return row.map(v => {
        if(v > seen) {
            seen = v;
            return 1;
        }
        return 0;
    }).reverse();
});
console.log("View west->east",w_e);

const n_s = matrix[0].map((_, colIdx) => {
    let seen = -1;
    return matrix.map(row => {
        if(row[colIdx] > seen) {
            seen = row[colIdx];
            return 1;
        }
        return 0;
    });
}).reverse();

const n_sT= n_s[0].map((_, colIdx) => n_s.map(row => row[colIdx]));
console.log("View north->south",n_sT);

const s_n = matrix.reverse()[0].map((_, colIdx) => {
    let seen = -1;
    
    return matrix.map(row => {
        if(row[colIdx] > seen) {
            seen = row[colIdx];
            return 1;
        }
        return 0;
    }).reverse();
}).reverse();


const s_nT= s_n[0].map((_, colIdx) => s_n.map(row => row[colIdx]));
console.log("View south->north",s_nT);


const dense_sums = []

for(let i = 0; i < s_nT.length; i++) {
    const temp = [];
    for(let j = 0; j < s_nT[0].length; j++) {
        const sumIdx = e_w[i][j] + w_e[i][j] + n_sT[i][j] + s_nT[i][j];
        temp.push(sumIdx);
    }
    dense_sums.push(temp);
}

console.log(dense_sums);
console.log(dense_sums.flat().filter(x => x == 0).length);
