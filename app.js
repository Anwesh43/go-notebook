const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')
const expressServer = express()
expressServer.use(express.static(path.join(__dirname, 'static')))
const server = http.createServer(expressServer)
const io = socketIo(server).of('/ns1')

io.on('connect', (socket) => {
    console.log("connect")
    socket.on('newWords', (data) => {
        console.log(data)
    })
})
server.listen(8000, () => {
    console.log("hello world")
})
