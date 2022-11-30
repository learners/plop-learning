const utils = require('./utils');
const prompts = require('./prompts');
const actions = require('./actions');

module.exports = function (plop) {
  plop.setWelcomeMessage('请选择一个生成器?');

  // Helpers
  plop.addHelper('dashAround', (text) => '---- ' + text + ' ----');
  plop.addHelper('wordJoin', function (words) {
    return words.join(', ').replace(/(:?.*),/, '$1, and'); // one, two, and three
  });

  // 作为模板的部分进行插入
  plop.addPartial(
    'salutation',
    '{{ greeting }}, my name is {{ properCase nickname }} and I am {{ age }}.'
  );

  // 自定义action
  plop.setActionType('doTheThing', function (answers, config, plop) {
    if (config.configProp) {
      return 'success status message';
    } else {
      // if something went wrong
      throw 'error message';
    }
  });
  // 异步action
  plop.setActionType('doTheAsyncThing', function (answers, config, plop) {
    return new Promise((resolve, reject) => {
      if (config.speed) {
          // resolve('success status message');
          resolve(utils.delayLog('success status message')(answers));
      } else {
          reject('error message');
      }
    });
  });

  plop.setGenerator('custom-action', {
    description: '生成器的描述信息',
    prompts: [
      ...prompts,
      {
        type: 'input',           // 交互类型
        name: 'name',            // 参数名称
        message: '请输入文件名称' // 交互提示
      }
    ],
    actions: data => {
      const name = '{{dashCase name}}'; // 可使用内置helpers，即修饰器
      return [
        'this is a comment', // 输出文字
        function (answers) {
          return 'yay';
        },
        utils.delayLog('打印异步消息'),

        actions.customAction(plop), // 自定义action

        ...actions.changeMeActions,
        {
          type: 'add', // 类型，创建模板文件
          path: `src/${name}.vue`, // 文件创建路径
          templateFile: './templates/index.hbs', // 文件模板
          data: { // 不写data的话，即prompts全部参数
            name
          }
        },

        {
          type: 'doTheThing',
          configProp: 'available from the config param'
        },
        {
          type: 'doTheAsyncThing',
          speed: 'slow'
        }
      ];
    }
  })

  ////////////////// 动态 action 生成器 ////////////////////////

  // npx plop --cwd templates/custom-action/ --dest . dynamic-actions

  // load some additional helpers from a module installed using npm
  // https://github.com/amwmedia/plop-pack-fancy-comments
  plop.load('plop-pack-fancy-comments', {
    prefix: '',
    upperCaseHeaders: true,
    commentStart: '',
    commentEnd: ''
  });

  plop.setGenerator('dynamic-actions', {
    description: 'another test using an actions function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: function (value) {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        }
      },
      {
        type: 'confirm', // confirm是否，用户需输入 y/Y 或 n/N
        name: 'hasPotatoes',
        message: 'Do you want potatoes with your burger?'
      }
    ],
    actions: function (data) {
      var actions = [
        {
          type: 'add',
          path: 'src/{{dashCase name}}-burger.txt',
          templateFile: 'templates/burger.txt', // 模板也可以用其他文件格式，不一定是hbs
          abortOnFail: false
        }
      ];

      if (data.hasPotatoes) { // 判断是否要执行action
        actions = actions.concat([
          {
            type: 'add',
            path: 'src/{{dashCase name}}-potatoes.txt',
            templateFile: 'templates/potatoes.txt',
            abortOnFail: false
          },
          {
            type: 'modify',
            path: 'src/{{dashCase name}}-burger.txt',
            pattern: /(!\r\n)/gi,
            template: '$1Your potatoes: {{dashCase name}}-potatoes.txt'
          }
        ]);
      }
      return actions;
    }
  })
}
