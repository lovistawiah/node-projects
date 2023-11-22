const fs = require("fs");

fs.readFile('./readme.md', "utf-8", (err, files) => console.log(files))
console.log('reading files......')
