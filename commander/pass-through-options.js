#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .passThroughOptions()
  // 选项仅会在命令参数之前被识别
  // 如要在子命令中使用此功能，必须首先启用带顺序的选项解析
  .option('-d, --dry-run')
  .argument('<utility>')
  .argument('[args...]')
  .action((utility, args, options) => {
    const action = options.dryRun ? 'Would run' : 'Running';
    console.log(`${action}: ${utility} ${args.join(' ')}`);
  });

program.parse();

// Try the following:
//    node pass-through-options.js git status
//    node pass-through-options.js git --version
//    node pass-through-options.js --dry-run git checkout -b new-branch
//    node pass-through-options.js git push --dry-run