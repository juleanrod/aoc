const fs = require('fs');
const path = require('path');

const readFile = name => {
    const data = fs.readFileSync(path.join(__dirname, name), "utf-8")
        .split('\n');
    return data.splice(0, data.length - 1);
}

const input = readFile("input.txt");
const matrix = input.map(str => str.split('').map(char => +char));

const look_right = matrix.map(row => {
    let score;
    return row.map((v, idx) => {
        score = 0; 
        if(idx == row.length - 1) return 0;
        if(idx == row.length - 2) return 1;
        if(idx + 1 < row.length - 1) {
            for(let i = idx + 1; i < row.length; i++) {
                if(row[i] >= v) {
                    score++;
                    break;
                } else {
                    score++;
                }
            }
        }
        return score;
    });
});

const look_left = matrix.map(row => {
    let score;
    return row.map((v, idx) => {
        score = 0;
        if(idx == 0) return 0;
        if(idx == 1) return 1;
        if(idx - 1 > 0) {
            for(let i = idx - 1; i >= 0; i--) {
                if(row[i] >= v) {
                    score++;
                    break;
                } else {
                    score++;
                }
            }
        }
        return score;
    });
});

const get_down = (grid) => {
    let score;
    for (let c = 0; c < grid[0].length; c++) {
        for (let r = 0; r < grid.length; r++) {
            score = 0;
            let v = grid[r][c];
            if(r == grid.length - 1) {
                grid[r][c] = 0;   
                break;
            }
            if(r >= grid.length - 2) {
                grid[r][c] = 1;   
            }
            if(r + 1 < grid.length) {
                for(let i = r + 1; i < grid.length; i++) {
                    if(grid[i][c] >= v) {
                        score++;
                        break;
                    } else {
                        score++;
                    }
                }
                grid[r][c] = score;
            }
        }
    }
    return grid;
}

const get_up = (grid) => {
    let score;
    for (let c = 0; c < grid[0].length; c++) {
        for (let r = grid.length - 1; r >= 0; r--) {
            score = 0;
            let v = grid[r][c];
            if(r == 0) {
                grid[r][c] = 0;   
                break;
            }
            if(r == 1) {
                grid[r][c] = 1;   
            }
            if(r - 1 > 0) {
                for(let i = r - 1; i >= 0; i--) {
                    if(grid[i][c] >= v) {
                        score++;
                        break;
                    } else {
                        score++;
                    }
                }
                grid[r][c] = score;
            }
        }
    }
    return grid;
}

let matrix_copy1 = JSON.parse(JSON.stringify(matrix));
const look_up = get_up(matrix_copy1);

let matrix_copy2 = JSON.parse(JSON.stringify(matrix));
const look_down = get_down(matrix_copy2);

let scores = [];
for(let i = 1; i < matrix.length - 1; i++) {
    for(let j = 1; j < matrix[0].length - 1; j++) {
        let right = look_right[i][j] == 0 ? 1 : look_right[i][j];
        let left = look_left[i][j] == 0 ? 1 : look_left[i][j];
        let up = look_up[i][j] == 0 ? 1 : look_up[i][j];
        let down = look_down[i][j] == 0 ? 1 : look_down[i][j];
        let score = right*left*up*down;
        scores.push(score);
    }
}

console.log(Math.max(...scores));
