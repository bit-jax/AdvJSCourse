const http = require('http')

const address = process.argv[2]

http.get(address, res => {
    let data = ''

    res.on('data', chunk => {
       data =+ chunk
    })
    res.on('end', () => {
        console.log(data)
    })
})