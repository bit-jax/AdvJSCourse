const http = require('http')

const server = http.createServer(function (request, response) {
    const theWay = new URL(`https://localhost:${process.argv[2]}${request.url}`)
    if (request.method === get) {
        if(theWay.pathname === 'api/parsetime') {
            let theDate = new Date(theWay.searchParams.get('iso'))
            let output = {
                'hours': theDate.getHours(),
                'minutes': theDate.getMinutes(),
                'seconds': theDate.getSeconds(),
            }
            response.end(JSON.stringify(output))
        }
    }
})
server.listen(process.argv[2])