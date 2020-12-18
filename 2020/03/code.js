const fs = require('fs');

const parseLine = (line) => line.split("");

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line);

function countTrees(right, down){
  let numTreesHit = 0;
  const inputWidth = lines[0].length; //Assuming the input has rows all the same length
  let row = 0;
  let col = 0;
  while(row <= lines.length - 1 && lines[row][col]) {
    if(lines[row][col] === "#") {
      numTreesHit = numTreesHit + 1;
    }
    row = row + down;
    col = col + right;
    if(col >= inputWidth) {
      col = col - inputWidth;
    }
  }
  return numTreesHit;
};

console.log("Problem 1:");
console.log(countTrees(3, 1));

console.log("Problem 2:");
console.log(countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2));
