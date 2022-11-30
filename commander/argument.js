#!/usr/bin/env node

// This example shows specifying the command arguments using argument() function.

const { Command } = require('commander');
const program = new Command();

program
  .name('connect')
  // 命令参数
  .argument('<server>', 'connect to the specified server')
  .argument('[user]', 'user account for connection', 'guest')
  .description('Example program with argument descriptions')
  .action((server, user) => {
    console.log('server:', server);
    console.log('user:', user);
  });

program
  .version('0.1.0')
  .command('rmdir')
  .arguments('<username> <password>') // 指定多个参数，但不包含参数描述
  .argument('<dirs...>') // 声明可变参数，只能最后一个参数支持这种用法
  .action(function (username, password, dirs) {
    dirs.forEach((dir) => {
      console.log('rmdir %s', dir);
    });
  });

program.parse();

// Try the following:
//    node argument.js --help
//    node argument.js main.remote.site
//    node argument.js main.remote.site admin
//    node argument.js rmdir root pass /data /config