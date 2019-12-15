const { createLogger, format, transports } = require('winston');
require('winston-mongodb');

module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
      json: true,
      colorize: true
    }),
    new transports.MongoDB({
      db: 'mongodb://localhost:27017/allwain',
      collection: 'logger',
      level: 'debug',
      capped: true
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      colorize: true
    })
  ]
});
