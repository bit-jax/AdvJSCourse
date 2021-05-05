const http = require('http')
const fs = require('fs')
const path = require('path')
const st = require('st')
const Router = require('http-hash-router')

const mount = st({ path: path.join(__dirname, '/static'), url: '/static' })
const router = Router()

// going to /static/<file-name> will serve the file <file-name>
router.set('/static/*', mount)

module.exports = function (deps) {
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

    req.on('end', function () {
      // at this point, data should be the entire json payload of the request
      fs.appendFile(deps.messagesPath, '\n' + data, err => {
        if (err) {
          res.statusCode = 500
          return res.end(err)
        }
        res.statusCode = 200
        res.end('Message posted successfully')
      })
    })
  }

  // this is the GET handler for /messages
  // this function should respond with the list of messages
  function getMessages (req, res) {
    fs.readFile(deps.messagesPath, 'utf8', (err, text) => {
      if (err) {
        res.statusCode = 500
        return res.end('Error reading messages')
      }

      const messages = text
        .split('\n')
        .filter(txt => txt) // will filter out empty string
        .map(JSON.parse)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(messages))
    })
  }

  return http.createServer((req, res) => {
    router(req, res, {}, function onError (err) {
      if (err) {
        res.statusCode = err.statusCode || 500
        res.end(err.message)
      }
    })
  })
}
