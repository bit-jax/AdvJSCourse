const http = require('http')
// const fs = require('fs')
const map = require('through2-map')

const server = http.createServer(function (request, response) {
    // let stream = fs.createReadStream(process.argv[3])
    request.pipe(map(function (piece) {
        return piece.toString().toUpperCase()
    })).pipe(response)
})
server.listen(process.argv[2])

