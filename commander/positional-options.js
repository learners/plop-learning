#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .enablePositionalOptions() // 启用带顺序的选项解析
  .option('-p, --progress');

program
  .command('upload <file>')
  .allowUnknownOption() // 允许使用未知选项，但不会添加到options选项参数对象中
  .option('-p, --port <number>', 'port number', 80)
  .action((file, options) => {
    if (program.opts().progress) console.log('Starting upload...');
    console.log(`Uploading ${file} to port ${options.port}`);
    if (program.opts().progress) console.log('Finished upload');
  });

program.parse();

// Try the following:
//    node positional-options.js upload test.js
//    node positional-options.js -p upload test.js
//    node positional-options.js upload -p 8080 test.js
//    node positional-options.js -p upload -p 8080 test.js