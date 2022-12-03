const fsPromise = require('fs').promises;
const path = require('path');

async function readFile(name) {
    let data;

    try {
        data = await fsPromise.readFile(path.join(__dirname, name), "utf8");
    } catch(e) {
        console.log(e);
    }

    return data;
}

function findDuplicates(data) {
    data = data.split('\n');
    data = data.slice(0, data.length - 1);
    const duplicates = Array.from(data.length).fill(0);
    const obj = {};

    for(let i = 0; i < data.length; i++) {
        const mid = data[i].length / 2;
        const left = data[i].slice(0, mid);
        const right = data[i].slice(mid);

        
        for(let j = 0; j < left.length; j++) {
            if(right.includes(left[j])) {
                duplicates[i] = left[j];
                break;
            }
        }
    }

    return duplicates;
}

function getPrioritieValues(arr) {

    for(let i = 0; i < arr.length; i++) {
        const value = arr[i] === arr[i].toString().toLowerCase() ? arr[i].charCodeAt(0) - 96 : arr[i].charCodeAt(0) - 38;
        arr[i] = value;
    }
    return arr;
}

function findGroupBadge(data) {
    data = data.split('\n');
    data = data.slice(0, data.length - 1);
    const groupBadges = Array(( data.length / 3 )).fill(0);
    let idx = 0;

    for(let i = 0; i < data.length-2; i+=3) {
        const firstElf = data[i].split('');
        const secondElf = data[i+1].split('');
        const thirdElf  = data[i+2].split('');

        const group = (firstElf + secondElf + thirdElf);

        for(let j = 0; j < group.length; j++) {
            const curr = group[j];
            if(firstElf.includes(curr) && secondElf.includes(curr) && thirdElf.includes(curr)){
                const value = curr === curr.toString().toLowerCase() ? curr.charCodeAt(0) - 96 : curr.charCodeAt(0) - 38;
                groupBadges[idx++] = value;
                break;
            }
        }
            
    }

    return groupBadges;
    
}

readFile('input.txt').then(data => {
    const duplicates = findDuplicates(data);
    const priorities = getPrioritieValues(duplicates);
    const prioritySum = priorities.reduce((acc, curr) => acc + curr, 0);
    console.log(prioritySum);
    const priorityGroup = findGroupBadge(data);
    const priorityGroupSum = priorityGroup.reduce((acc, curr) => acc + curr);
    console.log(priorityGroupSum);
});

