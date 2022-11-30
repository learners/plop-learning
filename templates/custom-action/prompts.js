module.exports = [
  {
    type: 'input',
    name: 'nickname',
    message: 'What is your nickname?',
    validate: function (value) {
      if (/.+/.test(value)) {
        return true;
      }
      return 'nickname is required';
    }
  },
  {
    type: 'input',
    name: 'age',
    message: 'How old are you?',
    validate: function (value) { // 校验数字
      var digitsOnly = /\d+/;
      if (digitsOnly.test(value)) {
        return true;
      }
      return 'Invalid age! Must be a number genius!';
    }
  },
  {
    type: 'checkbox',
    name: 'toppings',
    message: 'What pizza toppings do you like?',
    choices: [ // 多选列表
      { name: 'Cheese', value: 'cheese', checked: true },
      { name: 'Pepperoni', value: 'pepperoni' },
      { name: 'Pineapple', value: 'pineapple' },
      { name: 'Mushroom', value: 'mushroom' },
      { name: 'Bacon', value: 'bacon', checked: true }
    ]
  }
]
