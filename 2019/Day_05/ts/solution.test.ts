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

test(`${day}, Year ${year}, part 2`, (t) => {
  const input = '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99';
  t.is(new Solution(input).processPart2(3)[0], 999);
  t.is(new Solution(input).processPart2(8)[0], 1000);
  t.is(new Solution(input).processPart2(9)[0], 1001);
});
