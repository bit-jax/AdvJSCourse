const http = require('http')


http.createServer((req, res) => {
    res.end('hello')
})

Server.listen(8000, function () {
    console.log('server listening on port 8000')
})