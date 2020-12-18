const fs = require('fs');

const parseLine = (line) => {
  const numPeople = line.split("\n").filter((line) => line).length;
  const uniqueAnswers = line.replace(/\n/g, "").split("").filter((value, index, self) => self.indexOf(value) === index);
  const allYes = uniqueAnswers.filter((value) => (line.match(new RegExp(value, "g")) || []).length >= numPeople);
  return {
    line,
    numPeople,
    uniqueAnswers,
    allYes,
  }
};

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n\n").map((line) => parseLine(line)).filter((line) => line);

function sumUniqueAnswers() {
  return lines.reduce(((sum, line) => sum + line.uniqueAnswers.length), 0);
};

function sumAllYes() {
  console.log(lines[lines.length - 1]);
  return lines.reduce(((sum, line) => sum + line.allYes.length), 0);
}

console.log("Problem 1:");
console.log(sumUniqueAnswers());

console.log("Problem 2:");
console.log(sumAllYes());
