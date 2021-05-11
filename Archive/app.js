const fs = require('fs')
const express = require('express')
const { Server } = require('socket.io')

const app = express()

app.use(express.static('static'))
app.use(express.json())

module.exports = function (deps) {
  app.get('/messages', (req, res) => {
    fs.readFile(deps.messagesPath, 'utf8', (err, text) => {
      if (err) {
        return res.status(500).end('Error reading messages')
      }

      const messages = text
        .split('\n')
        .filter(txt => txt) // will filter out empty string
        .map(JSON.parse)

      res.json(messages)
    })
  })

  app.post('/messages', (req, res) => {
    const data = JSON.stringify(req.body)

    fs.appendFile(deps.messagesPath, '\n' + data, err => {
      if (err) {
        return res.status(500).end('failed to write to file')
      }

      res.end('Message posted successfully')
    })
  })

  const server = require('http').createServer(app)
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg)
      const data = JSON.stringify(msg)

      io.emit('chat message', msg)

      fs.appendFile(deps.messagesPath, '\n' + data, err => {
        if (err) {
          console.log('failed to write to file')
        }
      })
    })
  })

  return server
}
