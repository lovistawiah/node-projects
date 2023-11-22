const fs = require('fs')
// fs.renameSync('./assets/logs', 'accounts/logs.js')
// console.log('file moved succesfully')

// fs.rmdir('./assets', function (err) {
//     if (err) { throw err };
//     console.log('directory removed')
// })

fs.readdirSync('./accounts').forEach((file) => {
    fs.renameSync(`./accounts/${file}`, `./library/${file}`)
});

console.log('files removed')
fs.rmdirSync('./accounts');
console.log('./accounts directory removed')