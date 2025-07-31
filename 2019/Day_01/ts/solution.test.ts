import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution(12).processPart1(), 2);
  t.is(new Solution(14).processPart1(), 2);
  t.is(new Solution(1969).processPart1(), 654);
  t.is(new Solution(100756).processPart1(), 33583);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution(14).processPart2(), 2);
  t.is(new Solution(1969).processPart2(), 966);
  t.is(new Solution(100756).processPart2(), 50346);
});
