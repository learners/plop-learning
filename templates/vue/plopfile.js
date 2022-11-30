// npx plop -f --cwd templates/vue/ --dest .

module.exports = (plop) => {
  // 忽略 {{}} 解析
  plop.addHelper('escape', (options) => {
    return options.fn();
  });

  plop.setGenerator('test', {
    description: '生成 vue 组件',
    prompts: [
      {
        type: 'input',
        name: 'nickName',
        message: '请输入你的名字？'
      }
    ],
    actions: [
      {
        type: 'add',                   // 类型，创建模板文件
        path: 'src/views/App.vue',     // 文件创建路径
        templateFile: './App.vue.hbs', // 文件模板
      }
    ]
  });
}
