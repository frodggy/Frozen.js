// === imports ===
const { Command } = require('commander');
const shell = require('shelljs')
const { cwd } = require('process')
const {exec} = require('child_process')
// === local imports ===
const { saveJSON, loadJSON } = require('./lib/util/json')
const { main } = require('./lib/init')
const { install } = require('./lib/install')
const { addRepo, removeRepo } = require('./lib/repo')
const { run } = require('./lib/run')

// === vars ===
const program = new Command();

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
        install(package)
  });

program.command('init')
  .alias("up")
  .description('creates a frozen package')
  .action(() => {
      main()
  });

program.command('run')
  .alias("go")
  .description('runs main file')
  .action(() => {
      run()      
  });

program.command('shell')
  .alias("sh")
  .argument('<script>', 'string to split')
  .description('runs scripts from config file')
  .action((script, options) => {
      try {
          const config = require(`${cwd()}/frozen.config.json`)
          
          let cmd = (`config.scripts.${script}`)
          shell.exec(eval(cmd))
      } catch (error) {
          console.log(error)
      }
  });

program.command('add-repo')
  .alias("arp")
  .argument('<repo_name>')
  .argument('<repo_url>')
  .description('add a download repo')
  .action((repo_name, repo_url) => {
      addRepo(repo_name, repo_url)
  });

program.command('remove-repo')
  .alias("rrp")
  .argument('<repo>')
  .description('removes download repo')
  .action((repo, options) => {
      removeRepo(repo)
  });

program.parse();