const http = require('http')

http.get(process.argv[2], function callback (response) {
    response.setEncoding('utf8')
    let data = ''
    response.on('data', function (piece) {
        data += piece
    })
    response.on('end', function () {
        console.log(data.length)
        console.log(data)
    })
})



// the bl method
// 'use strict'
// const http = require('http')
// const bl = require('bl')

// http.get(process.argv[2], function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err) {
//       return console.error(err)
//     }
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })