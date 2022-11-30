const path = require('path');
const inquirerDirectory = require('inquirer-directory');

module.exports = function (plop) {
  plop.addHelper('absPath', function (p) {
    // 返回相对于plopfile的路径
    return path.resolve(plop.getPlopfilePath(), p);
  });

  plop.addPrompt('directory', inquirerDirectory);

  plop.setGenerator('custom-prompt', {
    description: 'custom inquirer prompt example',
    prompts: [
      {
        type: 'input',
        name: 'fileName',
        message: 'Pick a file name:',
        validate: function (value) {
          if (/.+/.test(value)) { // 增加校验，必须输入该值
            return true;
          }
          return 'file name is required';
        }
      },
      {
        type: 'directory',
        name: 'path',
        message: '选择一个目录?',
        basePath: plop.getPlopfilePath() // 相对于此路径，选择一个目录
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{fileName}}.txt',
        template: '{{absPath path}}/{{fileName}} plopped!', // 将内容写入path
      }
    ]
  })
}
