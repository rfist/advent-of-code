import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

interface IStepReducer {
  steps: number[];
  floor: number;
  position: number;
}

const replace = (value: string): number => value === '(' ? 1 : -1;

export class Solution {
  public input: any;
  constructor(input: any) {
    this.input = input;
  }

  public processPart1(): number {
    return R.pipe(R.split(''), R.map(replace), R.sum, Number)(this.input);
  }

  public processPart2(): number {
    const instructions: number[] = R.pipe(R.split(''), R.map(replace), R.map(Number))(this.input);
    const condition1 = ({ floor }: IStepReducer) => R.equals(floor, -1);
    const condition2 = ({ steps }: IStepReducer) => R.equals(steps.length, 0);
    const operation = ({ steps, floor, position }: IStepReducer) => ({
      floor: R.add(floor, Number(R.head(steps))),
      position: R.inc(position),
      steps: R.drop(1, steps),
    });
    const start = ({ steps: instructions, floor: 0, position: 0 });

    return R.until(R.either(condition1, condition2), operation)(start)
      .position;
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);

  console.log(`Santa takes ${chalk.yellow(solution.processPart1().toString())} floor`);
  console.log(`Santa enters first the basement at ${chalk.yellow(solution.processPart2().toString())} position`);
}
