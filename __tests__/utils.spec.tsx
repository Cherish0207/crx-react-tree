import { sum } from "../src/utils";
// describe 幸示分组,可以把多个单元测试分成一个组
// 以sum来分组
describe("sum", () => {
  // test 定义一个单元测试
  test("1+1", () => {
    expect(sum(1, 1)).toBe(2);
  });
  test("2+2", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
