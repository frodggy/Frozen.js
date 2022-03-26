const inquirer = require("inquirer");
const fs = require("fs");
const { basename } = require("path");
const { cwd } = require("process");
const exsitingConfig = fs.existsSync(cwd() + "/frozen.config.json");
if (exsitingConfig) {
  inquirer.prompt([
    {
      type: "confirm",
      name: "overwrite",
      message: "frozen.config.json already exists would you like to overwite it",
      default: false
    }
  ]).then((answer) => {
    if (answer.overwrite) {
      init();
    } else {
      console.log("Bye \u{1F44B}");
    }
  });
}
function init() {
  inquirer.prompt([
    {
      type: "text",
      name: "pname",
      message: "what is you project name",
      default: basename(cwd())
    },
    {
      type: "text",
      name: "pname",
      message: "what is you project name",
      default: basename(cwd())
    },
    {
      type: "text",
      name: "pname",
      message: "what is you project name",
      default: basename(cwd())
    }
  ]).then((answer) => {
  });
}
module.exports = { init };
//# sourceMappingURL=init.js.map
