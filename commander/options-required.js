#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program
  // 必填选项，要么设有默认值，要么必须在命令行中输入
  .requiredOption('-c, --cheese <type>', 'pizza must have cheese');

program.parse();

console.log(`Cheese type: ${program.opts().cheese}`);

// Try the following:
//    node options-required.js
//    node options-required.js --cheese blue