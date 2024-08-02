const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('myEvent', (data) => {
    console.log('Event occurred with data:', data);
   });

   myEmitter.emit('myEvent', 'Hello, World!');