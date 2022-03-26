const { Command } = require("commander");
const program = new Command();
const { init } = require("./lib/init");
program.name("frozen").description("atempt on of a package manager").version("0.1.0");
program.command("add").alias("install").description("installs a package").argument("<package>", "string to split").action((package2, options) => {
  let pkg = package2.split("@", 2);
  console.log(pkg);
});
program.command("init").alias("up").description("creates a frozen package").argument("[dir]", "the directory of the project").action((package2, options) => {
  init();
});
program.parse();
//# sourceMappingURL=index.js.map
