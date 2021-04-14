const mymodule = require('./mymodular.js')

const dir = process.argv[2]
const ext = process.argv[3]

function callback (err, list) {
    if (err) return console.log(err)

    list.forEach(file => {
        console.log(file)
    });
}

mymodule(dir, ext, callback)