const path = require('path')
// path file separator
console.log(path.sep)

// joining file path
const filepath = path.join('./content', 'test.txt')
console.log(filepath)

// getting the base name of a file
const base = path.basename(filepath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'test.txt')
console.log(absolute)

