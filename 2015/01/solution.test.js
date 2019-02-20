const { process } = require('./solution');

const  [day, year] = __dirname.split('/').reverse();
test(`Day ${day}, Year ${year} test`, () => {
  expect(process('(()(()(')).toBe("3");
  expect(process('))(')).toBe("-1");
});


