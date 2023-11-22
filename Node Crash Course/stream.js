const fs = require('fs')
const path = require('path')

const readStream = fs.createReadStream(path.join(__dirname, 'lorem.txt'), ({ encoding: 'utf8' }))

const writeStream = fs.createWriteStream(path.join(__dirname, 'new_lorem.txt'))




// readStream.on('data', (chunkData) => {
//     writeStream.write(chunkData)
// })

// ?efficient way to write a new file
readStream.pipe(writeStream)