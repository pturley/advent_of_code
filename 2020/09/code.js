const fs = require('fs');
const { exit } = require('process');

const uniq = (array) => array.filter((value, index, self) => self.indexOf(value) === index);

const parseLine = (line) => {
  return line ? parseInt(line) : undefined;
};

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line);

const canValueBeASumOfTwoPreamble = (value, preamble) => {
  let isSum = false;
  preamble.forEach((num1, index1) => {
    preamble.slice(index1).forEach((num2) => {
      if(num1 + num2 === value) { isSum = true; }
    });
  });
  return isSum;
}

const value = () => {
  const numbersThatDontWork = [];
  const preamble = []
  lines.forEach((line) => {
    if(preamble.length != 25) {
      preamble.push(line);
    } else {
      if(!canValueBeASumOfTwoPreamble(line, preamble)) { numbersThatDontWork.push(line) }
      preamble.shift();
      preamble.push(line);
    }
  });
  return numbersThatDontWork;
};

const setOfLinesThatSumToValue = () => {
  const val = value()[0];
  let result = undefined;

  lines.forEach((start, startIndex) => {
    if(result || start === val) { return };
    let slice = [start];
    lines.slice(startIndex + 1).forEach((end) => {
      if(end >= val) { return; }
      slice.push(end);
      const sumSlice = slice.reduce((accum, num) => accum + num, 0);
      if(val === sumSlice) {
        result = [...slice];
      }
    });
  });
  result.sort((a, b) => a - b);
  return result[0] + result[result.length - 1];
}


console.log("Problem 1:");
console.log(value());

console.log("Problem 2:");
console.log(setOfLinesThatSumToValue());
