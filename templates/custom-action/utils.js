// answers为用户输入答案
exports.delayLog = (msg) => (answers) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(msg), 2000);
  });
