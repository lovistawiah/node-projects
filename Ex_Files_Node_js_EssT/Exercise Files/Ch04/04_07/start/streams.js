const fs = require('fs')
// fs.readFile('C:\\Users\\lovis\\Documents\\SOFTWARE ENGINEERING\\BACK-END DEVELOPMENT\\NODE\\Ex_Files_Node_js_EssT\\Exercise Files\\Ch04\\04_07\\start\\chat-logs\\george-ben-chat.log', 'UTF-8', (err, chatLog) => {
//     // console.log(`File read: ${typeof chatLog}`)
//     if (err) { throw err };
//     console.log(`$`,chatLog.length)
// })

let stream = fs.createReadStream('C:\\Users\\lovis\\Documents\\SOFTWARE ENGINEERING\\BACK-END DEVELOPMENT\\NODE\\Ex_Files_Node_js_EssT\\Exercise Files\\Ch04\\04_07\\start\\chat-logs\\george-ben-chat.log', 'utf-8')

let data =[];
stream.once('data', (chunk) => {
    console.log('read stream started')
    console.log('======')
    // data.push(chunk)
    console.log(chunk)
})

console.log(data)