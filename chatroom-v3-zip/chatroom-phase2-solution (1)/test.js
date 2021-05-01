const test = require('tape')
const request = require('supertest')
const fs = require('fs')

const messagesPath = './test-messages-file.txt'

const app = require('./app')({ messagesPath: messagesPath })

const messages = [
  { text: 'hello! This is an example message.', date: '2020-05-15T02:05:15.596Z' },
  { text: 'This is another message.', date: '2020-05-15T02:05:15.596Z' }
]

// before starting tests, clear the test file
fs.writeFileSync(messagesPath, JSON.stringify(messages[0]))
fs.appendFileSync(messagesPath, '\n' + JSON.stringify(messages[1]))

test('server should respond to GET /messages with an array of messages', t => {
  request(app)
    .get('/messages')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      t.equal(err, null)
      t.deepEqual(res.body, messages)
      t.end()
    })
})

test('POST to server should add message to file', t => {
  const message1 = { text: 'test post message', date: '2020-05-15T02:05:15.596Z' }
  const message2 = { text: 'test2', date: '2020-05-15T02:05:15.596Z' }

  request(app)
    .post('/messages')
    .send(message1)
    .expect(200)
    .end(function (err, res) {
      t.equal(err, null)

      request(app)
        .post('/messages')
        .send(message2)
        .expect(200)
        .end(function (err, res) {
          t.equal(err, null)
          fs.readFile(messagesPath, 'utf8', (err, text) => {
            t.equal(err, null)
            t.match(text, /test post message/)
            t.match(text, /test2/)
            t.equal(text.split('\n').length, 4)
            t.end()
          })
        })
    })
})
