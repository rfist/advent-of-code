import chalk from 'chalk';
import * as fs from 'fs';
import R from 'ramda';

const process = (input: string): number[] => {
  const inputs: string[] = input.split('\n') .filter((value) => value && value.length);
  const part1 = R.pipe(R.map(calculateDay1), R.sum)(inputs);
  return [part1, 0];
};

const calculateDay1 = (enterValue: string): number => {
  const getAreas = ([w, h, l]: number[]) => [R.multiply(w, h), R.multiply(h, l), R.multiply(w, l)];
  const min = (values: number[]) => Math.min(...values);

  const areas = R.compose(getAreas, R.map(Number), R.split('x'))(enterValue);
  const countWrappingPaper = R.pipe(R.map(R.multiply(2)), R.sum);

  return countWrappingPaper(areas) + min(areas);
};

const inputRaw: string = fs.readFileSync(`${__dirname}/input.txt`)
  .toString();

const answer: number[] = process(inputRaw);

console.log(`Elves should order ${chalk.yellow(answer[0].toString())} square feet of wrapping paper`);
// console.log(`Santa enters first the basement at ${chalk.yellow(answer[1])} position`);

export {
  process,
};
