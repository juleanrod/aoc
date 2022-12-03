// need to grab data from file
const fs = require('fs').promises;

// part1
//const maxCaloriesPerElf = async (name) => {
    //let data = await fs.readFile(name, "utf8");
    //const caloriesMatrix = data.split('\n\n').map(collection => collection.split('\n'));
    //let maxCalories = -1;
    //caloriesMatrix.forEach((elf, i)=> {
        //let total = elf.reduce((acc, curr) => +curr + acc, 0);
        //if(total > maxCalories) {
            //maxCalories = total;
        //}
    //});
    //console.log(elfWithMostCalories, maxCalories);
    //return maxCalories;
//}

//console.log("Reading Elfs items' calorie list...");
//console.log("Processing data...")
//maxCaloriesPerElf("calories.txt");


// part2

const top3MaxCalories = async (name) => {
    let data = await fs.readFile(name, "utf-8");
    const caloriesMatrix = data.split('\n\n').map(collection => collection.split('\n'));
    const caloriesTotal = caloriesMatrix.map((elf, i)=> {
        let total = elf.reduce((acc, curr) => +curr + acc, 0);
        return total;
    });
    const top3 = caloriesTotal.sort((a,b) => b - a).slice(0, 3);
    const top3Total = top3.reduce((acc, curr) => curr + acc, 0);
    console.log(top3Total);
    return top3Total;
}

top3MaxCalories("calories.txt");


