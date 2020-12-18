const fs = require('fs');

const uniq = (array) => array.filter((value, index, self) => self.indexOf(value) === index);

const parseLine = (line) => {
  const matcher = line.match(/(?<command>\w{3}) (?<number>[+|-]\d{1,})/);
  if (!matcher) { return undefined };
  const { command, number } = matcher.groups
  return {
    command,
    number: parseInt(number),
  }
};

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line);

const value = (indexToAlter) => {
  const indexesVisited = [];
  let indexToVisit = 0;
  let value = 0;

  const alterCommand = (initalCommand) => {
    switch(initalCommand) {
      case 'nop':
        return 'jmp';
      case 'jmp':
        return 'nop';
      default:
        return initalCommand;
    }
  }

  while (!indexesVisited.includes(indexToVisit) && indexToVisit < lines.length) {
    indexesVisited.push(indexToVisit);
    const command = indexToVisit !== indexToAlter ? lines[indexToVisit].command : alterCommand(lines[indexToVisit].command)
    switch (command) {
      case 'nop':
        indexToVisit = indexToVisit + 1;
        break;
      case 'acc':
        value = value + lines[indexToVisit].number;
        indexToVisit = indexToVisit + 1;
        break;
      case 'jmp':
        indexToVisit = indexToVisit + lines[indexToVisit].number;
        break;
    }
  }
  return [value, indexToVisit === lines.length];
};

const valueWithFix = () => {
  let indexToAlter = 0;
  while(true) {
    const val = value(indexToAlter);
    if(val[1]) {
      return val[0];
    } else {
      indexToAlter = indexToAlter + 1;
    }
  }
}


console.log("Problem 1:");
console.log(value()[0]);

console.log("Problem 2:");
console.log(valueWithFix());
