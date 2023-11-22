const fs = require('fs')

let md = `
this  is a new file for Lovis and that's all
`

// fs.writeFile('./javaScript.md', md.trim(), function () {
//     console.log('Markdown Created')
// })
let appendFile = `
Just appending few words to the original ones
`
fs.appendFile('./javaScript.md', appendFile, function (err) {
    if (err) {
        throw err;
    }
    console.log('file appended')
})