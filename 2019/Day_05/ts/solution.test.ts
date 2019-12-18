import test from 'ava';
import R from 'ramda';
import {Solution} from './solution';

const [day, year] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
    t.is(new Solution('').convertInstruction(104).join(','), '4,1,0,0');
    t.is(new Solution('').convertInstruction(3).join(','), '3,0,0,0');
    t.is(new Solution('').convertInstruction(1002).join(','), '2,0,1,0');
    t.is(new Solution('').convertInstruction(99).join(','), '99,0,0,0');
    t.is(new Solution('3,0,4,0,99').processPart1(5).join(','), '5');
    t.is(new Solution('3,0,1,0,2,0,4,0,99').processPart1(5).join(','), '6');
    t.is(new Solution('3,0,1001,0,2,0,4,0,99').processPart1(5).join(','), '7');
});

// test(`${day}, Year ${year}, part 2`, (t) => {
// });
