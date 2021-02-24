module.exports = {
  verbose: true, //冗余 显示详细信息
  clearMocks: true, // 清除 mocks
  collectCoverage: true, // 收集测试覆盖率信息
  reporters: ["default", "jest-junit"], // 报告器 报告的格式 默认单元测试
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // 模块文件扩展名
  moduleDirectories: ["node_modules"], // 模块目录
  transform: {
    // 如果模块是.tsx结尾的文件，需要用ts-jest进行转译
    "^.+\\.tsx?$": "ts-jest",
  },
  // 表示要进行单元测试的正则匹配: 文件在__tests__目录下，或者以jsx|tsx结尾的文件
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx|tsx)$",
};
