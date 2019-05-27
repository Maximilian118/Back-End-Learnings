const EventEmitter = require('events');

// create class
class MyEmitter extends EventEmitter {};

// init object
const myEmitter = new MyEmitter();

// event listener
myEmitter.on('bla', () => console.log('Event Fired!'));

// init event
myEmitter.emit('bla');
myEmitter.emit('bla');
myEmitter.emit('event');
myEmitter.emit('event');