import test from 'ava';
import R from 'ramda';
import {Solution} from './solution';

const [day, year] = R.pipe(R.split('/'), (arr) => arr.reverse(), R.remove(0, 1))(__dirname);
const map1 =
`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const map2 =
`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`;

test(`${day}, Year ${year}, part 1`, (t) => {
  t.is(new Solution(map1).processPart1(), 42);
});

test(`${day}, Year ${year}, part 2`, (t) => {
  t.is(new Solution(map2).processPart2(), 4);
});
