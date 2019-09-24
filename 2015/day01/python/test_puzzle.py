import puzzle
import unittest
import os


class TestBasic(unittest.TestCase):
    def test1(self):
        self.assertEqual(puzzle.solve('(()(()('), 3)
    def test2(self):
        self.assertEqual(puzzle.solve('))('), -1)

if __name__ == '__main__':
    unittest.main()
