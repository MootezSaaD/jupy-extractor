from leetcode_tester import Tester
from json import dumps


class Solution():
    def driver(self, *args):
        # TODO: write your code here
        # Example:
        return sum(args)


if __name__ == '__main__':
    solution = Solution()
    test = Tester(solution.driver)
    # TODO: add test case here
    # Example:
    test.addTest(1, 2, 3)
    test.addTest(2, 4, 6)
    result = test.doTest()
    resultFile = open("result.json", "w")
    fileJsonContent = dumps(result.statistics())
    resultFile.write(fileJsonContent)
    resultFile.close()