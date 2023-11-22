const fs = require('fs');

fs.mkdir('yourFilesHere', { recursive: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log("file directory created")
})

