const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const { promises: fsPromises } = require('fs');
const path = require('path');
const EventEmitter = require('events');

class LogEmitter extends EventEmitter {}

const logEmitter = new LogEmitter();
const logEvents = async message => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const fileName = `${format(new Date(), 'yyyyMMdd')}.txt`;
  console.log(`fileName`, fileName);
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', fileName), logItem);
  } catch (error) {
    console.error('error', error);
  }
};
async function log(message) {
  logEmitter.on('log', msg => logEvents(msg));
  setTimeout(() => {
    logEmitter.emit('log', message);
  }, 2000);
}

module.exports = log;
