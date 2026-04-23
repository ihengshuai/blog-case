const EventEmitter = require('node:events');

const emitter = new EventEmitter();
const logger = msg => console.log(msg);
emitter.on('logger', logger);
emitter.emit('logger', 'Hi, EventEmitter!');
emitter.off('logger', logger);
emitter.emit('logger', ''); // 已解绑，没任何反应
