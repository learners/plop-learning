#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('thank-cmd')
  .argument('<name>')
  .option('-t, --title <honorific>', 'title to use before name')
  .option('-d, --debug', 'display some debugging')
  // options为选项参数
  // command为Command实例，即program
  .action((name, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}${name}`);
  });

program.parse();

// Try the following:
//    node thank.js John
//    node thank.js Doe --title Mr
//    node thank.js --debug Doe --title Mr