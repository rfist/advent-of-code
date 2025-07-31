import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('2x3x4').processPart1(), 58);
  t.is(new Solution('1x1x10').processPart1(), 43);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution('2x3x4').processPart2(), 34);
  t.is(new Solution('1x1x10').processPart2(), 14);
});
