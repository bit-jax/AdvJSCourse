const net = require('net')

const zeroes = (x) => {
    return (x < 10 ? "0" : "") + x;
  };
  

const server = net.createServer(function (socket) {
    let date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    let d = date.getDate()
    if (d < 10) {
        d = '0' + d.toString()
    }
    let h = date.getHours()
    let min = date.getMinutes()
    let myDate = `${y}-${m}-${d} ${h}:${min}`
    socket.write(myDate)
    socket.end('\n')
})
server.listen(process.argv[2])