import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution().processPart2('0222112222120000', 2, 2), '0110');
});
