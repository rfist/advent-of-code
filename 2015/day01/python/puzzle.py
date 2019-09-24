import os
from colorama import Fore, Style


def solve(input):
    return input.count('(') - input.count(')')


def solve_day2():
    i = 0
    while True:
       i += 1
       if i==10:
           return i


if __name__ == '__main__':
    input_path: str = os.path.abspath(os.path.dirname(__file__)) + '/../input.txt'
    with open(input_path) as input_file:
        data = input_file.readlines()[0]
        answer = solve(data)
        print('Santa takes', Fore.YELLOW + str(answer) + Style.RESET_ALL, 'floor')
        print('rfist', solve_day2())
