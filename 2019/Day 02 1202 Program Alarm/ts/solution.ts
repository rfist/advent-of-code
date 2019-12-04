import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

interface IMemory {
  input: number[];
  pointer: number;
}

export class Solution {
  public input: any;
  public readonly splittedInput: number[];

  constructor(input: any) {
    this.input = input;
    this.splittedInput = this.input.toString().split(',').filter((value: string) => value && value.length).map(Number);
  }

  public processPart1(): number {
    const startValue: IMemory = {
      input: this.splittedInput,
      pointer: 0,
    };
    const nextStep = (memory: IMemory) => {
      const opcode: number = memory.input[memory.pointer];
      const read = R.flip(R.prop)(memory.input);
      const pos1: number = memory.input[memory.pointer + 1];
      const pos2: number = memory.input[memory.pointer + 2];
      const outputPosition: number = memory.input[memory.pointer + 3];
      const operation1 = () => R.assoc(outputPosition.toString(),
        R.sum(R.map(read, [pos1, pos2] as any[]) as number[]), memory.input);
      const operation2 = () => R.assoc(outputPosition.toString(),
        R.multiply(read(pos1 as any) as number, read(pos2 as any) as number), memory.input);
      return R.pipe(
        R.assoc('input',
          R.cond([
            [R.equals(1), operation1],
            [R.equals(2), operation2],
          ])(opcode as never) ,
        ),
        R.mergeWith(R.add, { pointer: 4 }),
      )(memory);
    };

    const getCurrentCommand = (value: IMemory): number => value.input[value.pointer];
    const result = R.until(
        R.pipe(getCurrentCommand, R.equals(99)),
        nextStep,
    )(startValue as any);
    return result.input[0];
  }

  public processPart2(): number {
    const operation = ({ noun, verb }: any) => {
      verb = verb === 99 ? noun++ && 0 : verb + 1;
      this.splittedInput[1] = noun;
      this.splittedInput[2] = verb;
      return {
        noun,
        output: this.processPart1(),
        result:  100 * noun + verb,
        verb,
      };
    };

    return R.until(
      R.pipe(R.prop('output'), R.equals(19690720)),
      operation,
    )({
      noun: 0,
      output: 0,
      result: 0,
      verb: 0,
    }).result;
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);
  // replace position 1 with the value 12 and replace position 2 with the value 2.
  solution.splittedInput[1] = 12;
  solution.splittedInput[2] = 2;

  console.log(`Value at position 0 after restoring is ${chalk.yellow(solution.processPart1().toString())}`);
  console.log(`"100 * noun + verb" is ${chalk.yellow(solution.processPart2().toString())}`);
}
