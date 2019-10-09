import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('>').processPart1(), 2);
  t.is(new Solution('^>v<').processPart1(), 4);
  t.is(new Solution('^v^v^v^v^v').processPart1(), 2);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution('^v').processPart2(), 3);
  t.is(new Solution('^>v<').processPart2(), 3);
  t.is(new Solution('^v^v^v^v^v').processPart2(), 11);
});
