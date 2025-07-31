import solution
import unittest
import os


class TestBasic(unittest.TestCase):
    def test1(self):
        self.assertEqual(solution.processPart1('(()(()('), 3)
        self.assertEqual(solution.processPart1('))('), -1)
    def test2(self):
        self.assertEqual(solution.processPart2(')'), 1)
        self.assertEqual(solution.processPart2('()())'), 5)

if __name__ == '__main__':
    unittest.main()
