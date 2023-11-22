const fs = require('fs')

//making a new directory
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('directory created')
    })
} else {
    console.error('path exists')
}

// 
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('directory removed')
    })
} else {
    console.error('path does not exists')
}