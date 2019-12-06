import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution().testPassword(111111), true);
  t.is(new Solution().testPassword(223450), false);
  t.is(new Solution().testPassword(123789), false);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution().testPassword(112233, true), true);
  t.is(new Solution().testPassword(123444, true), false);
  t.is(new Solution().testPassword(111122, true), true);
  t.is(new Solution().testPassword(111115, true), false);
});
