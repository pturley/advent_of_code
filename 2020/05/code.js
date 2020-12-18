const fs = require('fs');

const parseLine = (line) => {
  const row = parseInt(line.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1"), 2);
  const col = parseInt(line.slice(7).replace(/L/g, "0").replace(/R/g, "1"), 2);
  return {
    row,
    col,
    seatId: (row * 8) + col,
  }
};

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line).sort((a, b) => b.seatId - a.seatId);

function highestSeatId() {
  return lines[0].seatId;
};

function missingSeat() {
  return lines.reduce((before, line, index) => {
    if(before) {return before};
    if(lines[index + 1].seatId !== line.seatId - 1) {
      return line;
    }
    return undefined;
  }, undefined);
}

console.log("Problem 1:");
console.log(highestSeatId());

console.log("Problem 2:");
console.log("before", missingSeat());
