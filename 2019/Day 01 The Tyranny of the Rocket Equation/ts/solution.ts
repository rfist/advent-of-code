import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

const round = (x: number) => parseInt(x.toString(), 10);
const countFuelAmount = R.pipe(R.divide(R.__, 3), round, R.subtract(R.__, 2), round);

interface IFuelCounter {
  requiredFuel: number;
  mass: number;
  totalFuel: number;
}

export class Solution {
  public input: any;
  private readonly splittedInput: number[];

  constructor(input: any) {
    this.input = input;
    this.splittedInput = this.input.toString().split('\n').filter((value: string) => value && value.length).map(Number);
  }

  public processPart1(): number {
    return R.pipe(R.map(countFuelAmount), R.sum)(this.splittedInput);
  }

  public processPart2(): number {
    const countAllFuel = (mass: number) => {
      const operation = (data: IFuelCounter) => {
        return R.pipe(
          R.assoc('requiredFuel', countFuelAmount(data.requiredFuel || data.mass)),
          R.assoc('totalFuel', R.sum([Math.max(0, data.requiredFuel), data.totalFuel])),
        )(data);
      };
      const startValue = operation({
        mass,
        requiredFuel: 0,
        totalFuel: 0,
      });
      return R.until(
        R.pipe(R.prop('requiredFuel'), R.lte(R.__, 0)), // condition
        operation,
      )(startValue).totalFuel;
    };

    return R.pipe(R.map(countAllFuel), R.sum)(this.splittedInput);
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);

  console.log(`Sum of the fuel requirements is ${chalk.yellow(solution.processPart1().toString())}`);
  console.log(`Sum of the fuel requirements with the additional fuel is ${chalk.yellow(solution.processPart2().toString())}`);
}
