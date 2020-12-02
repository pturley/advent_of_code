const fs = require('fs');

const parseLine = (line) => {
  const format = /(?<num1>[0-9]*)-(?<num2>[0-9]*) (?<letter>[a-z]): (?<password>.*)/;
  const match = line.match(format);
  return match ? match.groups : null;
}

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line);

function problem1(){
  const countCorrect = lines.reduce((countCorrectSoFar, line) => {
    const letterCount = (line.password.match(new RegExp(line.letter, "g")) || []).length;
    const isCorrect = Math.max(letterCount, line.num1) === letterCount && Math.min(letterCount, line.num2) === letterCount;
    return isCorrect ? countCorrectSoFar + 1 : countCorrectSoFar;
  }, 0);
  console.log("Count for problem 1:");
  console.log(countCorrect);
};

function problem2() {
  const countCorrect = lines.reduce((countCorrectSoFar, line) => {
    const isLeftMatch = line.password.charAt(line.num1 - 1) === line.letter;
    const isRightMatch = line.password.charAt(line.num2 - 1) === line.letter;
    const isCorrect = (isLeftMatch || isRightMatch) && !(isLeftMatch && isRightMatch);
    return isCorrect ? countCorrectSoFar + 1 : countCorrectSoFar;
  }, 0);
  console.log("Count for problem 2:");
  console.log(countCorrect);
};

problem1();
problem2();
