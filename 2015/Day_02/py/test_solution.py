import solution
import unittest
import os


class TestBasic(unittest.TestCase):
    def test1(self):
        self.assertEqual(solution.processPart1('2x3x4'), 58)
        self.assertEqual(solution.processPart1('1x1x10'), 43)
    def test2(self):
        self.assertEqual(solution.processPart2('2x3x4'), 34)
        self.assertEqual(solution.processPart2('1x1x10'), 14)


if __name__ == '__main__':
    unittest.main()
