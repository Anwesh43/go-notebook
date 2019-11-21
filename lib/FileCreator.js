const fs = require('fs')
const util = require('util')
const writePromise = util.promisify(fs.writeFile)

class FileCreator {

    static write(fileName, content) {
        return writePromise(fileName, content)
    }
}


module.exports = FileCreator
