const fs = require('fs')

let file = fs.readFileSync(process.argv[2])
// console.log(file)
let text = file.toString()
let arr = text.split('\n')
let count = -1
arr.forEach(element => {
    count +=1
});
console.log(count)