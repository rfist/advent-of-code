import chalk from 'chalk';
import R from 'ramda';

export class Solution {
    public testPassword(password: number, strict: boolean = false): boolean {
        const twoSameDigits = new RegExp(/(\d)(\1)(\1)*/g);
        const sortNumbers = R.pipe(
            (x: number) => String(x),
            R.split(''),
            (x: string[]) => x.sort(),
            R.join(''),
            Number,
        );
        return !strict ? R.equals(password, sortNumbers(password)) && twoSameDigits.test(String(password))
            : R.equals(password, sortNumbers(password)) &&
            R.defaultTo([])(String(password).match(twoSameDigits))
                .filter((value: string) => value && value.length === 2).length > 0;
    }

    public processPart1(): number {
        let amount = 0;
        for (let i = 108457; i <= 562041; i++) {
            amount += Number(this.testPassword(i));
        }
        return amount;
    }

    public processPart2(): number {
        let amount = 0;
        for (let i = 108457; i <= 562041; i++) {
            amount += Number(this.testPassword(i, true));
        }
        return amount;
    }
}

if (require.main === module) {
    const solution: Solution = new Solution();
    console.log(`There are ${chalk.yellow(solution.processPart1().toString())} different passwords within the range`);
    console.log(`There are ${chalk.yellow(solution.processPart2().toString())} different passwords within the range with all the criteria`);
}
