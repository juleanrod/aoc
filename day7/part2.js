const fs = require("fs");
const path = require("path");

// PART 2

function readFile(name) {

    let input = fs.readFileSync(path.join(__dirname, name), "utf-8")
                .split('\n');
    return input.slice(0, input.length - 1);
}

const input = readFile("input.txt");
console.log(input)

const system = input.reduce(
    ({ fs, cwd }, line) => {
        // ignore lines that start with '$ ls' or 'dir'
        if(["$ ls",  "dir"].some(v => line.startsWith(v))) 
            return { fs, cwd };

        if(line.startsWith("$ cd")) {
            const arg = /\$ cd (.*)/.exec(line)[1];
            if(arg === "/") 
                return { fs, cwd };
            
            return {
                fs,
                cwd: arg === ".." ? cwd.slice(0, -1) : [...cwd, arg]
            };
        }

        const size = Number(line.split(" ")[0]);
        let paths = [...cwd];

        do {
            const curr = paths.join("/") || "/";
            fs[curr] = fs[curr] ? fs[curr] + size : size;
        } while(paths.pop());

        return { fs, cwd };

    }, { fs: {}, cwd: [] });

const sizes = Object.values(system["fs"]);

const NEEDED_SPACE = 30000000;
const MAX_DISK_SPACE = 70000000;
const spaceAvailable = MAX_DISK_SPACE - system["fs"]["/"];

const part2 = sizes
    .reduce((acc, curr) => (spaceAvailable + curr > NEEDED_SPACE && acc > curr) ? curr: acc, Infinity);

console.log("Part 2: ", part2);
