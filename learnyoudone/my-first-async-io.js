const fs = require('fs')

fs.readFile(process.argv[2], function (err, data) {
    if (err) {
        console.log(err)
    }
    const lines = data.toString().split('\n')
    console.log(lines.length - 1)
})

// function cb(err, data) {
//     if (err) {
//         cb(err)
//     } else {

//         });
// }
// let file = (fs.readFile(process.argv, cb))
// // console.log(file)

// // let counter = -1
// // const text = data.toString.split('\n').forEach(element => {
// //     counter++