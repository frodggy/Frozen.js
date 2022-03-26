const { saveJSON, loadJSON } = require('./util/json')
const { cwd } = require('process')

function install(package) {
    let pkg = package.split('@', 2)
        if(pkg[1] === undefined) {
            let json = loadJSON(cwd() + '/frozen.config.json')
            eval(`json.dependencies.${pkg[0]} = "latest"`)
            saveJSON(cwd() + '/frozen.config.json', json)
            console.log('no version')
        } else {
            if (/\d{1,3}\.\d{1,2}\.\d{1,3}/.test(pkg[1])) {
                let json = loadJSON(cwd() + '/frozen.config.json')
                eval(`json.dependencies.${pkg[0]} = "^${pkg[1]}"`)
                saveJSON(cwd() + '/frozen.config.json', json)
                console.log(/\d{1,3}\.\d{1,2}\.\d{1,3}/.test(pkg[1]))
                    
            } else {
                console.log("invalid version in commnad ex) 1.0.0")
            }
        }  
}

module.exports = { install }