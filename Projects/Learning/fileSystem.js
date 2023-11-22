const { readFileSync, writeFileSync } = require('fs')

const first = readFileSync('./content/test.txt', 'utf-8');

const second = readFileSync('./content/sub/second.txt', 'utf-8');
console.log(first, second)

// writeFileSync('./content/resut.txt', `Here is the result 1. ${first} and here comes the second one ${second}`)

// using the flag object to append(a) and 
writeFileSync('./content/resut.txt', `Here is the result 1. ${first} and here comes the 
second one ${second}`, { flag: 'a' })