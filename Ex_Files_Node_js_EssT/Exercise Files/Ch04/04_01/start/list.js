const fs = require('fs')

//read directory of a file 
fs.readdir('./', function (err, files) {
    if (err) {
        throw err;
    }
    console.log(files)
})
