const cp = require('child_process')
const maxProcesses = 3

class CommandPromise {

    constructor(command, resolveCb, rejectCb) {
        this.resolveCb = resolveCb
        this.rejectCb = rejectCb
        this.command = command

    }
}
class CommandRunner {

    constructor() {
        this.queue = []
        this.processes = 0
    }
    addProcess(command) {
        return new Promise((resolve, reject) => {
            this.execute(command, resolve, reject)
        })
    }

    checkAndExecuteAgain() {
        this.processes--
        if (this.queue.length > 0) {
            const process = this.queue.splice(0, 1)[0]
            this.execute(process.command, process.resolveCb, process.rejectCb)
        }
    }

    execute(command, resolveCb, rejectCb) {
        if (this.processes < maxProcesses) {
            this.processes++
            cp.exec(command, (err, stdout) => {
                if (err == null) {
                    resolveCb(stdout)
                    this.checkAndExecuteAgain()
                } else {
                    rejectCb(err)
                    this.checkAndExecuteAgain()
                }
            })
        } else {
            console.log("waiting in the queue")
            this.queue.push(new CommandPromise(command, resolveCb, rejectCb))
        }
    }

    getQueueLength() {
        return this.queue.length
    }

}

module.exports = new CommandRunner()
