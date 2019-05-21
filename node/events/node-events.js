const EventEmitter = require('events');
const emitter = new EventEmitter();

// register a listener
emitter.on('Logged', () => {
  console.log('Listener Called');
});

// raise an event
setInterval(() => {
  emitter.emit('Logged');
}, 500);