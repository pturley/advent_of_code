const fs = require('fs');

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseInt(line));
lines.forEach((line1, index1) => {
  lines.slice(index1).forEach((line2, index2) => {
    if(line1 + line2 === 2020) {
      console.log("two total 2020");
      console.log(line1 * line2);
    }
    lines.slice(index1).slice(index2).forEach((line3) => {
      if(line1 + line2 + line3 === 2020) {
        console.log("three total 2020");
        console.log(line1 * line2 * line3);
      }
    });
  });
});
