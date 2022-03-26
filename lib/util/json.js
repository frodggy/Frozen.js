const fs = require('fs')


function loadJSON(filename = '') {
    return JSON.parse(
        fs.existsSync(filename)
        ? fs.readFileSync(filename).toString()
        : fs.writeFileSync(filename, JSON.stringify({}, null, 0))
    )
}

function saveJSON(filename, data) {
    return fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

module.exports = { saveJSON, loadJSON }