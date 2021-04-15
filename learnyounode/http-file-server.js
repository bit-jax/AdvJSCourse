const http = require('http')
const fs = require('fs')

const server = http.createServer(function (request, response) {
    let stream = fs.createReadStream(process.argv[3])
    stream.pipe(response)
})
server.listen(process.argv[2])