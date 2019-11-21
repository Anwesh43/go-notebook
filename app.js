const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')
const expressServer = express()
expressServer.use(express.static(path.join(__dirname, 'static')))
const server = http.createServer(expressServer)
const io = socketIo(server).of('/ns1')
const FileCreator = require('./lib/FileCreator')
const CommandContainer = require('./lib/CommandContainer')
const CommandRunner = require('./lib/CommandRunner')

const executeCommand = (content, properties) => {
    const d = new Date().getTime()
    const fileName = `go_${d}.go`
    const folderPath = path.join(__dirname, properties.folder)
    const filePath = path.join(folderPath, fileName)
    const command = `${properties.command}${filePath}`
    return new Promise((resolve, reject) => {
        FileCreator.write(filePath, content).then(() => {
            CommandRunner.addProcess(command).then((data) => {
                resolve(data)
            }).catch(reject)
        }).catch(reject)
    })

}

io.on('connect', (socket) => {
    console.log("connect")
    socket.on('newWords', (data) => {
        console.log(data)
    })
    socket.on('execute', (data) => {
        executeCommand(data.content, CommandContainer[data.lang]).then((output) => {
            socket.emit('result', {output, status : "success", ci : data.ci})
        }).catch(err => {
            socket.emit('result', {err, status : "false", ci : data.ci})
        })
    })
})
server.listen(8000, () => {
    console.log("hello world")
})
