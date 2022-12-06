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
    //console.log(crates)
    //now transpose transpose the crates matrix
    const transposedCrates = crates[0].map((_, colIdx) => crates.map(row => row[colIdx]));
    // now each row is an stack of crates
    // where first item is the top of the stack
    
    const moveCrates = (quantity, from, to, crates) => {

        // this will hold the crates taken from 'from'
        let temp = [];
        let fromStack = crates[from - 1];
        let toStack = crates[to - 1];
            
        for(let i = 0; i < fromStack.length; i++) {
            if(quantity == 0) break;
            if(fromStack[i] != ' ' && quantity > 0) {
                quantity--;
                temp.push(fromStack[i]);
                //then remove crate from the stack
                fromStack[i] = ' '
            }
        }
        crates[from - 1] = fromStack.filter(x => x != ' ');
        // now we will place the crates holded by temp into the top of the 'to' stack
        // first clear empty crates from the top of the 'to' stack
        const toClear = toStack.filter(crate => crate != ' ');

        const newStack = temp.concat(toClear);
        crates[to - 1] = newStack;
    }
    
    for(let x = 0; x < steps.length; x++) {
        moveCrates(steps[x][0], steps[x][1], steps[x][2], transposedCrates);
    }

    for(let x of transposedCrates){
        console.log(x[0]);
    }

});
