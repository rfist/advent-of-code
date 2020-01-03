import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

export class Solution {
  public processPart1(input: string, width: number, height: number): number {
    const layers = R.pipe(
      R.map(R.countBy(Number)),
      R.sortBy(R.prop('0')),
    )
    (R.splitEvery(height * width, input.trim().split('')));

    const multiple = R.apply(R.curry(R.multiply));
    // @ts-ignore
    return multiple(R.props(['1', '2'], R.head(layers) as any) as any);
  }

  public processPart2(input: string, width: number, height: number): string {
    const layers = R.splitEvery(height * width, input.trim().split(''));

    const result = layers.reduce((previousValue: any, currentValue: any) => {
      currentValue.forEach((item: string, index: number) => {
        if (previousValue[index] === '2' && item !== '2') {
          previousValue[index] = item;
        }
      });
      return previousValue;
    });

    this.decodeImages(result, width);

    return result.join('');
  }

  private decodeImages(data: string[], width: number): void {
    const lines: string[][] = R.splitEvery(width, data);
    lines.forEach((line: string[]) => {
      console.log(line.map((symbol: string) => symbol === '0' ? ' ' : '#').join(''));
    });

  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution();
  console.log(`The number of 1 digits multiplied by the number of 2 digits is ${chalk.yellow(solution.processPart1(inputRaw, 25, 6).toString())}`);
  console.log(`Decoded images is:`);
  solution.processPart2(inputRaw, 25, 6);
}
