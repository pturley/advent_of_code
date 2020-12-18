const fs = require('fs');

const parseLine = (line) => (line.split(/\s/).reduce((obj, val) => {
  const tuple = val.split(":");
  obj[tuple[0]] = tuple[1];
  return obj
}, {}));

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n\n").map((line) => parseLine(line)).filter((line) => line);

function countValidBasic() {
  return lines.reduce((numValid, line) => {
    return ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every((key) => Object.keys(line).includes(key)) ? numValid + 1 : numValid;
  }, 0);
};

function isBetween(val, low, high) {
  return Math.max(Math.min(parseInt(val), high), low) === parseInt(val);
}

function validate(key, line) {
  const value = line[key];
  if(!value) { return false; }
  switch(key) {
    case "byr":
      return isBetween(value, 1920, 2002);
    case "iyr":
      return isBetween(value, 2010, 2020);
    case "eyr":
      return isBetween(value, 2020, 2030);
    case "hgt":
      const match = value.match(/(?<num>[0-9]*)(?<suffix>in|cm)/);
      if(!match) {
        return false
      }
      const {num, suffix} = match.groups;
      if(suffix === "in") {
        return isBetween(num, 59, 76);
      }else if(suffix === "cm") {
        return isBetween(num, 150, 193);
      }
      return false;
    case "hcl":
      return !!value.match(/^#[0-9|a-f]{6}$/);
    case "ecl":
      return !!value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
    case "pid":
      return !!value.match(/^[0-9]{9}$/);
  }
  return true;
}

function countValidWithValidation() {
  return lines.reduce((numValid, line) => {
    return ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"].every((key) => validate(key, line)) ? numValid + 1 : numValid;
  }, 0);
};

console.log("Problem 1:");
console.log(countValidBasic());

console.log("Problem 2:");
console.log(countValidWithValidation());
