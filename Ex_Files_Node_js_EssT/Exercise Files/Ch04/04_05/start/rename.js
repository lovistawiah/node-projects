const fs = require('fs')

// rename a file synchronously
// fs.renameSync('./lib/config.js','./lib/lovis.js')

// rename a file
// fs.rename('./lib/note.md', './lib/notes.md', function (err) {
//     if (err) {
//         throw err;
//     }
//     console.log('file name changed')
// })


// remove file directory synchronously
// fs.unlinkSync('./lib/config.js')

// remove files async
fs.unlink('./lib/notes.md', function (err) {
    if (err) {
        throw err;
    }
    console.log('file remove from path')
})
