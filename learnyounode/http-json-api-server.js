const http = require('http')

const iUrl = process.argv[2]

const server = http.createServer(function (request, response) {
    let rUrl = request.url
    const theWay = new URL(`http://localhost:${iUrl}${rUrl}`)
    if (request.method == 'GET') {
        if(theWay.pathname === 'api/parsetime') {
            let theDate = new Date(theWay.searchParams.get('iso'))
            let output = {
                'hour': theDate.getHours(),
                'minute': theDate.getMinutes(),
                'second': theDate.getSeconds(),
            }
            response.end(JSON.stringify(output))
        }
        else if (theWay.pathname === 'api/unixtime') {
            let theDate = new Date(theWay.searchParams.get('iso'))
            let output = {
                'unixtime': theDate.getTime()
            }
            response.end(JSON.stringify(output))
        }
    }
})
server.listen(iUrl)