import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

const input = fs.readFileSync(`${__dirname}/input.txt`).toString();
const replace = (value: string): number => value === '(' ? 1 : -1;
const process = R.pipe(R.split(''), R.map(replace), R.sum, R.toString);

const answer: string = process(input);

console.log(`Santa takes ${chalk.yellow(answer)} floor`);

export {
  process,
};
