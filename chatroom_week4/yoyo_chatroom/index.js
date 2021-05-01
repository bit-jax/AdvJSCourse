const http = require('http')
const fs = require('fs')
const path = require('path')
const st = require('st') // st is a useful module to make serving static files easier
const Router = require('http-hash-router') // this module makes defining HTTP routes easier
const { on } = require('events')



const port = 8000

// TODO: make sure to create this file. This is where messages will be stored.
const MESSAGES_PATH = './messages.txt'

const mount = st({ path: path.join(__dirname, '/static'), url: '/static' })
const router = Router()

// going to /static/<file-name> will serve the file <file-name>
router.set('/static/*', mount)

// requests to /messages are either a GET or a POST
router.set('/messages', function (req, res) {
  if (req.method === 'GET') {
    getMessages(req, res)
  } else if (req.method === 'POST') {
    postMessage(req, res)
  } else {
    res.statusCode = 400
    res.end('unsupported operation')
  }
})

// this is the POST handler for /messages
// this function should write a new message to the file
function postMessage (req, res) {
  let data = ''
  req.on('data', function (chunk) {
    data += chunk

  })

  req.on('end', () => {
    data = data+ '\n'

    fs.appendFile('messages.json', data, err => {
        if (err) {
            console.log(err)
            res.end('There was an Error')
            return
        }else {
            res.statusCode = 200
            res.end('Message posted successfully')
        }
    })
  });
}


// this is the GET handler for /messages
// this function should respond with the list of messages
function getMessages (req, res) {
        fs.readFile('messages.json', 'utf8', (err, data) => {
            if (err) {
                res.end(err)
                
            } else {

                console.log(data)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                // res.end(JSON.stringify(data))
                let messages = data.split('\n').filter(str => str != '' ).map(JSON.parse)
                res.end(JSON.stringify(messages))
            }
        })
}

const server = http.createServer((req, res) => {
  router(req, res, {}, function onError (err) {
    if (err) {
      res.statusCode = err.statusCode || 500
      res.end(err.message)
    }
  })
})

server.listen(port)

console.log('server listening on port:', port)

