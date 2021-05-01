const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = express.Router();
const port = 8000
const fs = require('fs')

app.use(express.static('static'))

//GET
app.get('/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, text) => {
        const messages = text
            .split('\n')
            .filter(txt => txt) // will filter out empty string
            .map(JSON.parse)
        // console.log(text)
        res.json(messages)
    })
})

//POST
app.use(express.json());

app.post('/messages', function (request, response) {
        // console.log(request.body)
        fs.appendFile('messages.txt', JSON.stringify(request.body) + '\n', err => {
        if (err) {
          response.statusCode = 500
          return response.end(err)
        }
        response.end('Message posted successfully')
      })
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })
})

//Server is listening
server.listen(port, () => {
    console.log('listening on the port')
})