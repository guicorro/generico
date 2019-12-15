const morgan = require('morgan');
const logger = require('./logger');

logger.stream = {
  write: message => {
    let handler = message.split(' ')[2].charAt(0);
    // let time = message.split(' ')[3];
    switch (handler) {
      case '1':
        logger.info(message.substring(0, message.lastIndexOf('\n')));
        break;
      case '2':
        logger.info(message.substring(0, message.lastIndexOf('\n')));
        break;
      case '3':
        logger.warn(message.substring(0, message.lastIndexOf('\n')));
        break;
      case '4':
        logger.error(message.substring(0, message.lastIndexOf('\n')));
        break;
      case '5':
        logger.error(message.substring(0, message.lastIndexOf('\n')));
        break;
      default:
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
  }
};

module.exports = morgan(
  ':method :url :status :response-time ms :remote-user ":user-agent" - :res[content-length]',
  { stream: logger.stream }
);
