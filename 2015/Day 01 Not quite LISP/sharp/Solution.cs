using System;
using System.IO;
using System.Linq;

namespace day01
{
  class Solution
  {
    static void Main(string[] args)
    {
      Solution solution = new Solution();
      string input = File.ReadAllText("../input.txt");
      Console.Write("Santa takes ");
      Console.ForegroundColor = ConsoleColor.DarkYellow;
      Console.Write(solution.processPart1(input));
      Console.ResetColor();
      Console.Write(" floor");
      Console.WriteLine();
      Console.Write("Santa enters first the basement at ");
      Console.ForegroundColor = ConsoleColor.DarkYellow;
      Console.Write(solution.processPart2(input));
      Console.ResetColor();
      Console.Write(" position");
      Console.WriteLine();
    }

    public int processPart1(string input)
    {
      return input.Count(x => x == '(') - input.Count(x => x == ')');
    }
    public int processPart2(string input)
    {
      int floor = 0;
      int position = 0;
      foreach (char c in input)
      {
        position++;
        floor = floor + (c == '(' ? 1 : -1);
        if (floor == -1)
        {
          break;
        }
      }
      return position;
    }
  }
}
