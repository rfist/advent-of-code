import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('(()(()(').processPart1(), 3);
  t.is(new Solution('))(').processPart1(), -1);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution(')').processPart2(), 1);
  t.is(new Solution('()())').processPart2(), 5);
});
