const { process } = require('./solution');

const  [day, year] = __dirname.split('/').reverse();
test(`Day ${day}, Year ${year} test`, () => {
  expect(process('2x3x4')[0]).toBe(58);
  expect(process('1x1x10')[0]).toBe(43);
});

// test(`Day ${day}, Year ${year} test part 2`, () => {
//     expect(process(")")[1]).toBe("1");
//     expect(process("()())")[1]).toBe("5");
// });
