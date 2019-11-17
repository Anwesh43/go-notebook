const commandRunner = require('./lib/CommandRunner')
const command = 'node dummyProcess.js'
const startTime = new Date().getTime()
for (var i = 0; i < 21; i++) {
    commandRunner.addProcess(command).then((stdout) => {
        const currTime = new Date().getTime()
        const diff = currTime - startTime
        console.log(`execution finished after ${diff}`)
    })
}
