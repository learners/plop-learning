#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .usage('usage') // 首行提示
  .description('description') // 详细描述
  .option('-f, --foo', 'enable some foo')
  // 内建的帮助信息
  .helpOption('-h, --help', 'help me')
  // 帮助子命令，如node custom-help help subcmd
  .addHelpCommand('help [command]', 'show assistance')
  .action((options) => {
    // program.help(); // 展示帮助信息，退出程序
    // program.outputHelp(); // 展示帮助信息,不退出程序
  })

program
  .command('subcmd')
  .summary("make a copy") // 子命令简介

program.addHelpText('after', `
Example call:
  $ custom-help --help`);

program.addHelpText('after', ({ error, command }) => {
  return '\nBye!'
});

// 出现命令用法错误时，展示完整的帮助或自定义的帮助信息
program.showHelpAfterError();
// 禁用未知命令或选项错误时的建议拼写，如(Did you mean --help?)
program.showSuggestionAfterError(false);

program.parse(process.argv);

// Try the following:
//    node custom-help --help