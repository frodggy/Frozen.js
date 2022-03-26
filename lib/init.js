const inquirer = require("inquirer")
const fs = require('fs')
const { basename } = require('path')
const { cwd } = require('process');
const bJSON = require('./util/json')
const exsitingConfig = fs.existsSync(cwd() + '/frozen.config.json')




function main() {
    if (exsitingConfig) {
        inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'frozen.config.json already exists would you like to overwite it',
                default: false
            }
        ])
        .then((answer) => {
            if (answer.overwrite) {
                init()
            } else {
                console.log('Bye 👋')
            }
        });
    } else {
        init()
    }
    
}
function getEntry() {
    try {
        const pjson = require(cwd() + '/package.json')
        return pjson.main
    } catch (error) {
        console.log(error)
    }
}

function init() {
    inquirer
    .prompt([
        {
            type: 'text',
            name: 'pname',
            message: 'what is your project name',
            default: basename(cwd())
        },
        {
            type: 'text',
            name: 'pdescription',
            message: 'what is your project description',
        },
        {
            type: 'text',
            name: 'pversion',
            message: 'what is your project version',
            default: '1.0.0',
            validate: async (pversion) => {
                if (!/^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(pversion)) {
                    console.log(" invalid version")
                    return
                } else {
                    return /^(\d+\.)?(\d+\.)?(\*|\d+)$/.test(pversion)
                }   
            }
        },
        {
            type: 'text',
            name: 'pentry',
            message: 'what is your project entry point',
            default: getEntry()
        },
    ])
    .then((answer) => {
        let json = JSON.parse(`{"name": "${answer.pname}", "description": "${answer.pdescription}", "version": "${answer.pversion}", "main": "${answer.pentry}", "dependencies": {}}`)
        bJSON.saveJSON('frozen.config.json', json)
    });
}

module.exports = { init, main }