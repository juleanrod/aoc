const path = require('path');
const fsPromise = require('fs').promises;

async function readFile(name) {
    let data = await fsPromise.readFile(path.join(__dirname, name), "utf-8");
    return data;
}

readFile("input.txt").then(resolved => { let data = String(resolved).split('\n');
    // delete last empty line
    data = String(data.slice(0, data.length - 1));

    data = String(data).split(',')

    const crates = []
    const steps = []
    let breakPoint; 
    for(let j = 0; j < data.length; j++) {
        // line is a string
        const line = data[j];
        if(line === '' || line[0] == '1') {
            breakPoint = j+1;
            break;
        }
        const filtered = []
        for(let i = 0; i < line.length; i++) {
            if(i % 2 != 0) {
                filtered.push(line[i]);
            }
        }
        data[j] = filtered.join('');
        crates.push(filtered.filter((x, i) => (i % 2 !== 0 ? '' : x)));
    }
    crates.pop();

    for(let q = breakPoint; q < data.length; q++) {
        let s = data[q].split(' ');
        let temp = []

        for(let k = 0; k < s.length; k++) {
            if(s[k] !== 'to' && s[k].length <= 2){
                temp.push(+s[k]);
            }
        }
        steps.push(temp);
    }

    const moveCrates = (quantity, from, to, allCrates) => {
        // the idea is to move the quantity of crates  into the 
        // queue as you pop crates of the stack 'from'
        // and then poll queue and push the value into the stack 'to'
        const  queue = [];

        // from to queue
        for(let r = 0; r < allCrates.length; r++) {
            if(quantity <= 0) break;
            if(allCrates[r][from - 1] != ' ' && quantity > 0) {
                queue.push(allCrates[r][from - 1]);
                allCrates[r][from - 1] = ' ';
                quantity--;
            }
        }

        // TODO: inserting a new row into the matrix 
        // if the queue has items and top of stack is full and top of matrix
        let referenceRow = allCrates.length - 1;
        let referenceCol = to - 1;
        while(queue.length > 0) {
            // check that we are not already at the top of matrix
            if (allCrates[referenceRow][referenceCol] === ' '){
                //add it to the stack
                allCrates[referenceRow][referenceCol] = queue.shift();
            }
            if (referenceRow == 0 && queue.length) {
                const newRow = Array(allCrates[0].length).fill(' ');
                newRow[referenceCol] = queue.shift();
                allCrates.unshift(newRow);
                ++referenceRow;
            } 
            referenceRow--;

        }

        // check if row is empty, remove it
        for(let x = 0; x < allCrates.length; x++) {
            if(allCrates[x].every(x => x === ' ')) {
                allCrates.shift();
            }
        }

    }

    for(let e = 0; e < steps.length; e++) {
        moveCrates(steps[e][0], steps[e][1], steps[e][2], crates);
    }
    
    let response = []

    for(let c = 0; c < crates[0].length; c++) {

        for(let r = 0; r < crates.length; r++) {
            //console.log(`Currently on row${r} column${c}`)
            const curr = crates[r][c]
            if(curr != ' ') {
                response.push(curr); 
                break;
            }
        }
    }
    console.log(response.join(''))
});
