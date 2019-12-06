import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

export class Solution {
  public input: any;
  public readonly splittedInput: string[];

  constructor(input: any) {
    this.input = input;
    this.splittedInput = this.input.split('\n').filter((value: string) => value && value.length);
  }

  public processPart1(): number {
    const grid: any = {};
    const getLabel = (position: any): string => position.x + '_' + position.y;
    this.splittedInput.forEach((path: string) => {
      const moves: string[] = path.split(',').filter(R.pipe(R.isEmpty, R.not));
      const position = { x: 0, y: 0 };
      const cached: string[] = [];
      moves.forEach((move: string) => {
        const direction: string = move[0];
        const distance: number = Number(move.substr(1));
        Array.from({ length: distance }).fill(0).forEach(() => {
          switch (direction) {
            case 'R':
              position.x++;
              break;
            case 'L':
              position.x--;
              break;
            case 'U':
              position.y++;
              break;
            case 'D':
              position.y--;
              break;
          }

          const label: string = getLabel(position);
          if (!cached.includes(label)) {
            const value: number = R.add(R.defaultTo(0)(grid[label]), 1);
            grid[label] = value;
            cached.push(label);
          }
        });
      });
    });
    const isCrossed = (x: number) => x === 1;
    const countDistance = (coords: string[]) => Math.abs(Number(coords[0])) + Math.abs(Number(coords[1]));
    return R.pipe(R.reject(isCrossed),
      R.keys,
      R.map(R.split('_')),
      R.map(countDistance),
      (intersestions) => Math.min(...intersestions),
    )(grid);
  }

  public processPart2(): number {
    const grid: any = {};
    const getLabel = (position: any): string => position.x + '_' + position.y;
    this.splittedInput.forEach((path: string) => {
      const moves: string[] = path.split(',').filter(R.pipe(R.isEmpty, R.not));
      const position = { x: 0, y: 0, steps: 0 };
      const cached: string[] = [];
      moves.forEach((move: string) => {
        const direction: string = move[0];
        const distance: number = Number(move.substr(1));
        Array.from({ length: distance }).fill(0).forEach(() => {
          switch (direction) {
            case 'R':
              position.x++;
              break;
            case 'L':
              position.x--;
              break;
            case 'U':
              position.y++;
              break;
            case 'D':
              position.y--;
              break;
          }
          position.steps++;

          const label: string = getLabel(position);
          if (!cached.includes(label)) {
            const value: number = R.add(R.defaultTo(0)(grid[label] && grid[label].value), 1);
            grid[label] = {
              steps: position.steps + R.defaultTo(0)(grid[label] && grid[label].steps),
              value,
            };
            cached.push(label);
          }
        });
      });
    });
    const isCrossed = (x: any) => x.value === 1;
    return R.pipe(R.reject(isCrossed),
      R.values,
      R.map(R.prop('steps')),
      R.apply(Math.min),
    )(grid);
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);
  console.log(`Closest distance from the central port to the closest intersection is ${chalk.yellow(solution.processPart1().toString())}`);
  console.log(`Fewest combined steps the wires must take to reach an intersection is ${chalk.yellow(solution.processPart2().toString())}`);
}
