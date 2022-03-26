// === imports ===
const { Command } = require('commander');
const program = new Command();
const { main } = require('./lib/init')
const { cwd } = require('process')
const {exec} = require('child_process')
const shell = require('shelljs')

const config = require(cwd() + '/frozen.config.json')
// === functions ===
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


// === cli ===
program
  .name('frozen')
  .description('atempt on of a package manager')
  .version('0.1.0');

program.command('add')
  .alias("install")
  .description('installs a package')
  .argument('<package>', 'string to split')
  .action((package, options) => {
      let pkg = package.split('@', 2)
      console.log(pkg);
  });

program.command('init')
  .alias("up")
  .description('creates a frozen package')
  .action((package, options) => {
      main()
  });

program.command('run')
  .alias("go")
  .description('runs main file')
  .action((package, options) => {
      try {
        
      } catch (error) {
          console.log(error)
      }
  });

program.parse();