const fs = require('fs')

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, function (err, list){
        if (err) return callback(err)

        callback(null, list.filter(file => file.endsWith('.' + ext)))
    })
}