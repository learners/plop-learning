const fs = require('fs');

exports.customAction = plop => answers => {
  // move the current working directory to the plop file path
  // this allows this action to work even when the generator is
  // executed from inside a subdirectory
  process.chdir(plop.getPlopfilePath());

  // custom function can be synchronous or async (by returning a promise)
  var existsMsg = 'psst {{name}}, change-me.txt already exists';
  var copiedMsg = 'hey {{name}}, I copied change-me.txt for you';
  var changeFileName = 'change-me.txt';
  var changeFilePath = plop.getDestBasePath() + '/src/' + changeFileName;

  // you can use plop.renderString to render templates
  existsMsg = plop.renderString(existsMsg, answers); // 渲染字符串
  copiedMsg = plop.renderString(copiedMsg, answers);

  if (fs.existsSync(changeFilePath)) { // 文件存在，则控制台输出信息
    // returned value shows up in the console
    return existsMsg;
  } else { // 不存在，则拷贝
    // do a synchronous copy via node fs
    fs.writeFileSync(
      changeFilePath,
      fs.readFileSync('templates/' + changeFileName)
    );
    return copiedMsg;
  }
}

exports.changeMeActions = [
  {
    type: 'modify',
    path: 'src/change-me.txt',
    pattern: /(-- APPEND ITEMS HERE --)/gi,  // 匹配path文件的内容，并替换成模板
    template: '$1\r\n{{nickname}}: {{age}}'
  },
  {
    type: 'modify',
    path: 'src/change-me.txt',
    pattern: /(-- PREPEND ITEMS HERE --)/gi,
    templateFile: 'templates/part.txt'
  },
  {
    type: 'modify',
    path: 'src/change-me.txt',
    pattern: /## replace name here ##/gi,
    template: 'replaced => {{dashCase nickname}}'
  },
  {
    type: 'modify',
    path: 'src/change-me.txt',
    skip (data) {
      // 如果没有选择mushroom，则跳过
      if (!data.toppings.includes('mushroom')) {
        // Skip this action
        return 'Skipped replacing mushrooms';
      } else {
        // Continue with this action
        return;
      }
    },
    // 跳过action，则不会执行这里
    // fileContents即path文件，data为用户输入答案
    transform (fileContents, data) {
      return fileContents.replace(/mushrooms/g, 'pepperoni');
    }
  }
]
