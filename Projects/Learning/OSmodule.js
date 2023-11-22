const os = require('os')
// user info
const user = os.userInfo()
console.log(user)
// uptime of the system
console.log(`The system uptime is ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMen: os.freemem()
}
console.log(currentOS)