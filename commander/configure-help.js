const commander = require('commander');
const program = new commander.Command();

// This example shows a simple use of configureHelp.

program.configureHelp({
  sortSubcommands: true, // 子命令是否以字母升序排序
  // 显示子命令的名称，而非用法
  subcommandTerm: (cmd) => cmd.name() // Just show the name, instead of short usage.
});

program.command('zebra <herd-size>', 'African equines with distinctive black-and-white striped coats');
program.command('aardvark [colour]', 'medium-sized, burrowing, nocturnal mammal');
program
  .command('beaver', 'large, semiaquatic rodent')
  .option('--river')
  .option('--pond')

program.parse();

// Try the following:
//    node configure-help.js --help