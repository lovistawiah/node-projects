// // const http = require('http')
// // const fs = require('fs')


// // const server = http.createServer((req, res) => {
// //     console.log(fs.stat('test.txt', (err, data) => {
// //         if (err) throw err;
// //         console.log(data)
// //     }))
// //     const stream = fs.createReadStream('test.txt',)
// //     stream.pipe(res)
// // }).listen(5000)




// const buff = Buffer.from('Hello world')
// console.log(buff.toString()) 




// const express = require('express')
// // const path = require('path')
// const app = express();


// const PORT = 3000;
// app.set("view engine", 'pug');

// app.get('/', function (req, res) {
//     res.render('index', { title: "Express View Engine", h1: " Express ", p: "Express Template Engine" })
// }).listen(PORT, () => console.log("server started at http://localhost:3000"))
































// // SERVING A STATIC FILE....
// // app.use('public', express.static('static'));

// //              OR

// // const publicPath = path.resolve(__dirname, path.resolve('static'))
// // app.use(publicPath, express.static("static"))








// // CREATING A LOGGER
// // const Logger = function (req, res, next) {
// //     console.log("LOGGED")
// //     next();
// // }
// // const requestTime = function (req, res, next) {
// //     req.requestTime = Date.now()
// //     next()
// // }
// // app.use(Logger)
// // app.use(requestTime)
// // app.get("/", (req, res) => {
// //     res.send(`Current Time ${req.requestTime}`);
// // })

// app.listen(5000, () => console.log('port started'));