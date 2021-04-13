const fs = require('fs')

fs.readdir(process.argv[2], function (err, data){
    if (err) {
        console.log(err)
    }
    const groups = data.filter(file => file.endsWith(process.argv[3])
    )
    // console.log(groups)
    groups.forEach(element => {
        if (element !== process.argv[3]){
        console.log(element)
        }
    }); 
})