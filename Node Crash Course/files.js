const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')


// ?            USING ASYNC/AWAIT TO READ,WRITE AND APPEND A FILE

const fileOperations = async () => {
    try {
        // ? Deleting a file using unlink()
        await fsPromises.unlink(path.join(__dirname, 'reply.txt'))


        //?          Reading file
        const readData = await fsPromises.readFile(path.join(__dirname, 'starter.txt'), 'utf8')
        console.log(readData)

        //?         Writing file
        const Data = 'Nice to meet you, Lovis!'
        const writeFile = await fsPromises.writeFile(path.join(__dirname, 'reply.txt'), Data)

        //?      Append a file
        const appendData = '\nSee ya!'
        // ? checking for file accessibility 
        if (fsPromises.access(path.join(__dirname, 'reply.txt'))) {
            const appendFile = await fsPromises.appendFile(path.join(__dirname, 'reply.txt'), appendData)
        }

        //?      Rename a file
        const renameFile = await fsPromises.rename(path.join(__dirname, 'reply.txt'), path.join(__dirname, 'New_reply.txt'))
    } catch (err) {
        console.error(err)
    }
}

fileOperations()






// // Read a file
// // ? path join() combines the directory and the specified filename in the second param.
// fs.readFile(path.join(__dirname, 'starter.txt'), (err, data) => {
//     if (err) throw err;
//     console.log(data.toString())
// })

// // ?                                writing to a new file.
// let data = 'Nice to meet you!'

// // ! this will override an existing file and its contents
// fs.writeFile(path.join(__dirname, 'reply.txt'), data, (err) => {
//     if (err) throw err
//     console.log('Write complete')

// })
// // ?                            append to a file.
// //?   this will create and write to a file if specified filename does not exist. OR append data to existing file
// data = '\nthis a new meet you!'
// fs.appendFile(path.join(__dirname, 'text.txt'), data, (err) => {
//     if (err) throw err
//     console.log('Write complete')
// })


//? exit on uncaught errors
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1)
})
