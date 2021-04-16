const http = require('http')

const iUrl = '/messages'

const server = http.createServer(function (request, response) {
    const myPath = new URL (`http://localhost:8000${iUrl}`
    )
})