import os
from colorama import Fore, Style


def processPart1(input):
    return input.count('(') - input.count(')')


def processPart2(input):
    floor = 0
    position = 0
    for i in input:
        position += 1
        floor = floor + (1 if i == '(' else -1)
        if floor == -1:
            return position


if __name__ == '__main__':
    input_path: str = os.path.abspath(
        os.path.dirname(__file__)) + '/../input.txt'
    with open(input_path) as input_file:
        data = input_file.readlines()[0]
        print('Santa takes', Fore.YELLOW +
              str(processPart1(data)) + Style.RESET_ALL, 'floor')
        print("Santa enters first the basement at", Fore.YELLOW +
              str(processPart2(data)) + Style.RESET_ALL, "position")
