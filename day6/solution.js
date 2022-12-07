const fsPromise = require('fs').promises;
const path = require('path');

async function readFile(name) {
    let data;

    try {
        data = await fsPromise.readFile(path.join(__dirname, name), 'utf8');
    } catch(e) {
        console.log(e);
    }

    return data;
}

function findMarker(data, numUniqueChars = 4) {

    let result;

    for(let i = 0; i < data.length; i++) {
        let slice = new Set(data.slice(i, i + numUniqueChars)) 
        if(slice.size == numUniqueChars) {
            result = i + numUniqueChars;
            break;
        }
    }

    return result;
}

readFile('input.txt').then(r => {

    const packetStartIdx = findMarker(r.split(''));
    console.log(packetStartIdx);
    
})
