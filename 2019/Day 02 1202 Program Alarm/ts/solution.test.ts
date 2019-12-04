import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('1,0,0,0,99').processPart1(), 2);
  t.is(new Solution('2,3,0,3,99').processPart1(), 2);
  t.is(new Solution('2,4,4,5,99,0').processPart1(), 2);
  t.is(new Solution('1,1,1,4,99,5,6,0,99').processPart1(), 30);
  t.is(new Solution('1,9,10,3,2,3,11,0,99,30,40,50').processPart1(), 3500);
  t.is(new Solution('12,2,10,3,2,3,11,0,99,30,40,50').processPart1(), 19690720);
});