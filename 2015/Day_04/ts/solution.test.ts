import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('abcdef').processPart1(), 609043);
  // t.is(new Solution('pqrstuv').processPart1(), 1048970);
});

// test(`${day}, Year ${year}, part 2`, (t) => {
//   t.is(new Solution('^v').processPart2(), 3);
//   t.is(new Solution('^>v<').processPart2(), 3);
//   t.is(new Solution('^v^v^v^v^v').processPart2(), 11);
// });
