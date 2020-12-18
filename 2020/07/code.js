const fs = require('fs');

const uniq = (array) => array.filter((value, index, self) => self.indexOf(value) === index);

const parseLine = (line) => {
  const baseBagMatcher = line.match(/(?<baseBag>\w{1,} \w{1,})/);
  if (!baseBagMatcher) { return undefined };
  const { baseBag } = baseBagMatcher.groups
  const hasContainedBags = line.match(/(?<numBags>\d{1,}) (?<bag>\w{1,} \w{1,})/g);
  const containedBags = hasContainedBags ? hasContainedBags.map((match) => match.match(/(?<numBags>\d{1,}) (?<bag>\w{1,} \w{1,})/).groups).reduce((mapping, group) => {
    mapping[group.bag] = parseInt(group.numBags);
    return mapping;
  }, {}) : {};

  return {
    baseBag,
    containedBags,
  }
};

const lines = fs.readFileSync('input.txt', 'utf8').toString().split("\n").map((line) => parseLine(line)).filter((line) => line);

const bagHousingMapping = lines.reduce((mapping, line) => {
  const {baseBag, containedBags} = line;
  Object.keys(containedBags).forEach((containedBag) => {
    mapping[containedBag] = mapping[containedBag] || [];
    mapping[containedBag].push(baseBag);
  })
  return mapping;
}, {});

const bagContainmentMapping = lines.reduce((mapping, line) => {
  const {baseBag, containedBags} = line;
  mapping[baseBag] = {...mapping[baseBag], ...containedBags};
  return mapping;
}, {});

const countContainingBagPossibilities = (bag, previouslySeen = []) => {
  const newBags = (bagHousingMapping[bag] || []).reduce((accum, possibleNewBag) => previouslySeen.includes(possibleNewBag) ? accum : [...accum, possibleNewBag], []);
  const seen = uniq([...previouslySeen, bag]);
  if(newBags === []) { return seen }
  return newBags.reduce((all, newBag) => countContainingBagPossibilities(newBag, all), seen);
};

const countBagsDeep = (bag) => {
  return Object.keys(bagContainmentMapping[bag]).reduce((accum, containedBag) => accum + bagContainmentMapping[bag][containedBag] * countBagsDeep(containedBag), 1);
};


console.log("Problem 1:");
console.log(countContainingBagPossibilities('shiny gold').length - 1) // counts the top level bag

console.log("Problem 2:");
console.log(countBagsDeep('shiny gold') - 1) // counts the top level bag
