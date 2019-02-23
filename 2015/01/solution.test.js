const { process } = require('./solution');

const  [day, year] = __dirname.split('/').reverse();
test(`Day ${day}, Year ${year} test`, () => {
  expect(process('(()(()(')[0]).toBe("3");
  expect(process('))(')[0]).toBe("-1");
});

test(`Day ${day}, Year ${year} test part 2`, () => {
    expect(process(")")[1]).toBe("1");
    expect(process("()())")[1]).toBe("5");
});
