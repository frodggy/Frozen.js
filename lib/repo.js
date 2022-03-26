const { cwd } = require('process')
const { saveJSON, loadJSON } = require('./util/json')

function addRepo(repoName, repoUrl = '') {
    let json = loadJSON(cwd() + '/frozen.config.json')
    eval(`json.repo.${repoName} = "${repoUrl}"`)
    saveJSON(cwd() + '/frozen.config.json', json)
}

function removeRepo(repoName) {
    let json = loadJSON(cwd() + '/frozen.config.json')
    delete json.repo[repoName]
    saveJSON(cwd() + '/frozen.config.json', json)
}

module.exports = { addRepo, removeRepo }