const EventEmitter = require('events');
const util = require('util');
const emitter = new EventEmitter();

//! orden matters

//*add listener
//! emitter.on and emitter.addListener are equals to
emitter.on('messageLogged', function () {
  console.log('listener called');
});
//! emitter.on and emitter.addListener are equals to
emitter.addListener('messageLogged', function () {
  console.log('listener called after on');
});
emitter.removeListener('messageLogged', function () {
  console.log('listener removed');
});

//*Raise an event
emitter.emit('messageLogged');
