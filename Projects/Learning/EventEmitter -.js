const EventEmitter = require('events')

const customEmitter = new EventEmitter();

customEmitter.on('response', (age, pos) => {
    console.log('hello world')
    console.log(age, pos)
})


customEmitter.emit('response', 22, 'software Engineer');
