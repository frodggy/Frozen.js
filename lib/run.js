const shell = require('shelljs')
const { cwd } = require('process')


function run() {
    try {
        const config = require(`${cwd()}/frozen.config.json`)
        shell.exec(`node ${config.main}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { run }