// npx plop --cwd templates/action-error/ richard

module.exports = (plop) => {
  plop.setGenerator("test", {
    description: "this is a test",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      }
    ],
    actions: [
      (data) => {
        if (data.name === 'richard') {
          return 'success!'
        } else {
          throw new Error("Action failed");
        }
      }
    ]
  });
}