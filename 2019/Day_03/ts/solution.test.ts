import test from 'ava';
import R from 'ramda';
import { Solution } from './solution';

const [ day, year ] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution('R8,U5,L5,D3\nU7,R6,D4,L4').processPart1(), 6);
  t.is(new Solution('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83').processPart1(), 159);
// tslint:disable-next-line:max-line-length
  t.is(new Solution('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7').processPart1(), 135);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution('R8,U5,L5,D3\nU7,R6,D4,L4').processPart2(), 30);
  t.is(new Solution('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83').processPart2(), 610);
// tslint:disable-next-line:max-line-length
  t.is(new Solution('R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7').processPart2(), 410);
});
