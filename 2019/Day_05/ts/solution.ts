import chalk from 'chalk';
import fs from 'fs';
import R from 'ramda';

interface IMemory {
  input: number[];
  output: number[];
  pointer: number;
}

export class Solution {
  public input: any;
  public readonly splittedInput: number[];

  constructor(input: any) {
    this.input = input;
    this.splittedInput = this.input.toString().split(',').filter((value: string) => value && value.length).map(Number);
  }

  public convertInstruction(instruction: number): number[] {
    const paddedInstruction = instruction.toString().padStart(5);
    const opcode: number = Number(paddedInstruction.substr(paddedInstruction.length - 2));
    const modes: number[] = paddedInstruction.substr(0, paddedInstruction.length - 2).split('').map(Number).reverse();
    return [opcode, ...modes];
  }

  public processPart1(input: number): number[] {
    const startValue: IMemory = {
      input: this.splittedInput,
      output: [],
      pointer: 0,
    };
    const nextStep = (memory: IMemory) => {
      const instructions: number[] = this.convertInstruction(memory.input[memory.pointer]);
      const opcode: number = instructions[0];
      const read = R.flip(R.prop)(memory.input);
      const pos1: any = instructions[1] ?
        memory.input[memory.pointer + 1] : read(memory.input[memory.pointer + 1] as any);
      const pos2: any = instructions[2] ?
        memory.input[memory.pointer + 2] : read(memory.input[memory.pointer + 2] as any);
      const outputPosition: number = memory.input[memory.pointer + 3];
      const operation1 = () => R.assoc(outputPosition.toString(),
        R.sum([pos1, pos2]), memory.input);
      const operation2 = () => R.assoc(outputPosition.toString(),
        R.multiply(pos1, pos2), memory.input);
      const operation3 = () => R.assoc(memory.input[memory.pointer + 1].toString(), input, memory.input);
      const operation4 = () =>
        memory.output.push(memory.input[memory.input[memory.pointer + 1]]) &&
        memory.output;
      return R.pipe(
        R.assoc('input',
          R.cond([
            [R.equals(1), operation1],
            [R.equals(2), operation2],
            [R.equals(3), operation3],
            [R.equals(4), R.always(memory.input)],
          ])(opcode as never),
        ),
        R.assoc('output',
          R.cond([
            [R.equals(4), operation4],
            [R.T, R.always(memory.output)],
          ])(opcode as never),
        ),
        R.mergeWith(R.add, {pointer: [3, 4].includes(opcode) ? 2 : 4}),
      )(memory);
    };

    const getCurrentCommand = (value: IMemory): number => value.input[value.pointer];
    const result = R.until(
      R.pipe(getCurrentCommand, R.equals(99)),
      nextStep,
    )(startValue as any);
    return result.output;
  }

  public processPart2(): number {
    return 0;
  }
}

if (require.main === module) {
  const inputRaw: string = fs.readFileSync(`${__dirname}/../input.txt`).toString();
  const solution: Solution = new Solution(inputRaw);
  // 3122865
  console.log(`Program produces diagnostic code ${chalk.yellow(solution.processPart1(1).reverse()[0].toString())}`);
}
