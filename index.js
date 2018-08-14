const express = require('express')
const http = require('http')
const io = require('socket.io')

const app = express()
const server = http.Server(app)
const socket = io(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

socket.on('connection', (s) => {
    console.log('a user connected')

    s.on('chat message', (msg) => {
        socket.emit('chat message', msg)
    })

    s.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(3000, () => {
    console.log('listening on 3000')
})