import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

const inputRaw: string = fs.readFileSync(`${__dirname}/input.txt`).toString();
const replace = (value: string): number => value === '(' ? 1 : -1;

interface IStepReducer {
  steps: number[];
  floor: number;
  position: number;
}

const process = (input: string): string[] => {
  const part1 = R.pipe(R.split(''), R.map(replace), R.sum, R.toString);

  const instructions: number[] = R.pipe(R.split(''), R.map(replace), R.map(Number))(input);
  const condition1 = ({ floor }: IStepReducer) => R.equals(floor, -1);
  const condition2 = ({ steps }: IStepReducer) => R.equals(steps.length, 0);
  const operation = ({ steps, floor, position }: IStepReducer) => ({
    floor: R.add(floor, Number(R.head(steps))),
    position: R.inc(position),
    steps: R.drop(1, steps),
  });
  const init = (steps: number[]): IStepReducer => ({ steps, floor: 0, position: 0 });

  const part2 = R.until(R.either(condition1, condition2), operation);
  return [part1(input), part2(init(instructions)).position.toString()];
};

const answer: string[] = process(inputRaw);

console.log(`Santa takes ${chalk.yellow(answer[0])} floor`);
console.log(`Santa enters first the basement at ${chalk.yellow(answer[1])} position`);

export {
  process,
};
