import os
from colorama import Fore, Style


def processPart1(inputs):
    """
    Return solution for day2, part one
    """
    total = 0
    inputs = inputs if type(inputs) is list else [inputs]
    for input in inputs:
        [w, h, l] = map(int, input.split('x'))
        areas = [w * h, h * l,  w * l]
        total = total + sum(map(lambda x: x * 2, areas)) + (min(areas))
    return total


def processPart2(inputs):
    """
    Return solution for day2, part one
    """
    total = 0
    inputs = inputs if type(inputs) is list else [inputs]
    for input in inputs:
        [a, b, c] = sorted(map(int, input.split('x')))
        total = total + (a * 2 + b * 2 + (a * b * c))
    return total


if __name__ == '__main__':
    input_path: str = os.path.abspath(
        os.path.dirname(__file__)) + '/../input.txt'
    with open(input_path) as input_file:
        data = input_file.readlines()
        print('Elves should order', Fore.YELLOW +
              str(processPart1(data)) + Style.RESET_ALL, 'square feet of wrapping paper')
        print("Elves should order", Fore.YELLOW +
              str(processPart2(data)) + Style.RESET_ALL, "feet of ribbon")
