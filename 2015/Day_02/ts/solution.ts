import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

export class Solution {
  public input: any;
  private splittedInput: string[];
  constructor(input: any) {
    this.input = input;
    this.splittedInput = this.input.split('\n').filter((value: string) => value && value.length);
  }

  public processPart1(): number {
    return R.pipe(R.map(this.calculateDay1), R.sum)(this.splittedInput);
  }

  public processPart2(): number {
    const diff = (a: number, b: number): number => a - b;
    const presentWrapper = R.pipe(
      // @ts-ignore
      R.split('x'), R.map(Number), R.sort(diff), R.init, R.map(R.multiply(2)), R.sum,
    );
    const bowWrapper = R.pipe(R.split('x'), R.map(Number), R.reduce(R.multiply, 1));
    const calculate = (value: string) => presentWrapper(value) + bowWrapper(value);

    return R.pipe(R.map(calculate), R.sum)(this.splittedInput);
  }

  private calculateDay1(enterValue: string): number {
    const getAreas = ([w, h, l]: number[]) => [R.multiply(w, h), R.multiply(h, l), R.multiply(w, l)];
    const min = (values: number[]) => Math.min(...values);

    const areas = R.compose(getAreas, R.map(Number), R.split('x'))(enterValue);
    const countWrappingPaper = R.pipe(R.map(R.multiply(2)), R.sum);

    return countWrappingPaper(areas) + min(areas);
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);

  console.log(`Elves should order ${chalk.yellow(solution.processPart1().toString())} square feet of wrapping paper`);
  console.log(`Elves should order ${chalk.yellow(solution.processPart2().toString())} feet of ribbon`);
}
