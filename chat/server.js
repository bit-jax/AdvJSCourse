const http = require('http')
const url = require('url')
const myPort = 4000
const fs = require('fs')

let server = http.createServer(function (req,res){
    if (req.method === 'GET'){
        if (req.url === '/messages'){
            fs.readFile('C:\\Users\\18082\\Desktop\\python\\class\\week2\\webchatroom\\dummy.txt', function (err,data){
                if (err){
                    console.log(err)
                }
                const dummyRead = data.toString().split('\n')
                for (let i = 0; i < dummyRead.length; i++){
                    if ( i !== dummyRead.length - 1){
                        let test = dummyRead[i]
                        let newer = test.split(',')
                        console.log(newer[0])
                        console.log(newer[1])
                        console.log(newer[2])
                    }
                }
                return res.end(dummyRead.join('\n'))
            })
        }
    }
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body +=  chunk.toString(); 
        });
        req.on('end', () => {
            let date = new Date()
            body += ',' + date + ('\n')
            fs.writeFile('dummy.txt', body, {'flag':'a'}, function (err) {
                if (err) return console.log(err);
                return res.end('we did what you needed')
              });
        });
    }
    else {
        res.end('request method must be GET or POST')
    }
})
server.listen(myPort)
if (server.listening){
    console.log('server up')
}