const http = require('http')
const fs = require('fs')
const path = require('path')
const fsPromises = require('fs/promises')
const logEvents = require('./logEvents')
const eventEmitter = require('events');
class Emitter extends eventEmitter { };


const myEmitter = new Emitter()

myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 5000

const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath,
            contentType == 'text/html' || 'text/plain' ? 'utf8' : '')
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(data)
    } catch (err) {
        console.log(err)
        myEmitter.emit('log', `${err.name}:\t${err.message}`, 'errLog.txt')

        response.statusCode = 500
        response.end()
    }
}
const server = http.createServer((req, res) => {
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt')

    const extension = path.extname(req.url)
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break;

        case '.js':
            contentType = 'text/javascript'
            break;

        case '.png':
            contentType = 'image/png'
            break;

        case '.jpeg':
            contentType = 'image/jpeg'
            break;

        case '.json':
            contentType = 'application/json'
            break;

        case '.txt':
            contentType = 'text/plain'
            break;
        default:
            contentType = 'text/html'
            break;
    }
    let filePath =
        contentType == 'text/html' && req.url == '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) == '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url)

    // ? making .html extension not required in the browser
    if (!extension && req.url.slice(-1) === '/') filePath;

    const fileExist = fs.existsSync(filePath);
    if (fileExist) {
        serveFile(filePath, contentType, res)
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, { 'Location': '/new-page.html' })
                res.end()
                break;

            case 'www-page.html':
                res.writeHead(301, { 'Location': '/' })
                res.end()
                break;

            default:
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res)
                break;
        }
    }
    console.log(req.url, req.method)
})

server.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))
