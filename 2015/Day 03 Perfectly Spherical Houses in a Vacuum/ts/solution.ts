import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

interface IPosition {
  x: number;
  y: number;
}

interface IAcc {
  houses: Set<string>;
  position: IPosition;
}

const moveToNextHouse = (input: IAcc, value: string) => R.cond([
  [R.pipe(R.prop('value'), R.equals('<')), ({ acc }) => !R.isEmpty(acc.position.x--) && acc],
  [R.pipe(R.prop('value'), R.equals('>')), ({ acc }) => !R.isEmpty(acc.position.x++) && acc],
  [R.pipe(R.prop('value'), R.equals('^')), ({ acc }) => !R.isEmpty(acc.position.y++) && acc],
  [R.pipe(R.prop('value'), R.equals('v')), ({ acc }) => !R.isEmpty(acc.position.y--) && acc],
  [R.T, ({ acc }) => acc],
])({ acc: input, value });
const addRecord = (input: IAcc) => input.houses.add(`${input.position.y}.${input.position.x}`) && input;

export class Solution {
  public input: any;
  constructor(input: any) {
    this.input = input;
  }

  public processPart1(): number {
    const accObject: IAcc = {
      houses: new Set(['0.0']),
      position: { x: 0, y: 0 },
    };

    return R.reduce(R.pipe(moveToNextHouse, addRecord), accObject, this.input).houses.size;
  }

  public processPart2(): number {
    const accObject: IAcc = {
      houses: new Set(['0.0']),
      position: { x: 0, y: 0 },
    };

    const indexEven = (_: any, idx: number): boolean => idx % 2 === 0;
    const santaInput = R.addIndex(R.filter)(indexEven, this.input.split(''));
    const roboSantaInput = R.addIndex(R.reject)(indexEven, this.input.split(''));

    R.reduce(R.pipe(moveToNextHouse, addRecord), accObject, R.map(String)(santaInput));
    accObject.position = { x: 0, y: 0 };

    return R.reduce(R.pipe(moveToNextHouse, addRecord), accObject, R.map(String)(roboSantaInput)).houses.size;
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);

  console.log(`${chalk.yellow(solution.processPart1().toString())} houses receive at least one present`);
  console.log(`${chalk.yellow(solution.processPart2().toString())} houses receive at least one present`);
}
