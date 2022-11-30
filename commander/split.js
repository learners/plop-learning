const { program } = require('commander');

program
  .option('--first') // 解析为布尔值
  .option('-s, --separator <char>');

program.parse();

const options = program.opts();

console.log(options) // 选项及选项参数
console.log(program.args) // 命令参数

const limit = options.first ? 1 : undefined; // 表示显示多少个数组元素
// console.log(program.args[0].split(options.separator, limit));

// Try the following:
//    node split -s / --fits a/b/c
//    node split -s / --first a/b/c
//    node split --separator=, a,b,c

// 更多示例：https://github.com/tj/commander.js/tree/master/examples