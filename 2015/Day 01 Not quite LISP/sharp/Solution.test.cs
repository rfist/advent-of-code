using Xunit;
using day01;

namespace test
{
  public class Test
  {
    [Fact]
    public void PassingTest()
    {
      Solution solution = new Solution();
      Assert.Equal(3, solution.processPart1("(()(()("));
    }
    [Fact]
    public void PassingTest2()
    {
      Solution solution = new Solution();
      Assert.Equal(-1, solution.processPart1("))("));
    }

    [Fact]
    public void PassingTest3()
    {
      Solution solution = new Solution();
      Assert.Equal(1, solution.processPart2(")"));
    }

    [Fact]
    public void PassingTest4()
    {
      Solution solution = new Solution();
      Assert.Equal(5, solution.processPart2("()())"));
    }
  }
}