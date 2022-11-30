#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();

program
  // 方括号表示可选选项，选项不带参数时可作为 boolean 选项
  .option('-c, --cheese [type]', 'Add cheese with optional type');

program.parse(process.argv);

const options = program.opts();
if (options.cheese === undefined) console.log('no cheese');
else if (options.cheese === true) console.log('add cheese');
else console.log(`add cheese type ${options.cheese}`);

// Try the following:
//    node options-boolean-or-value
//    node options-boolean-or-value --cheese
//    node options-boolean-or-value --cheese mozzarella