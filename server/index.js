'use strict';

var mongoose = require('mongoose');
var app = require('./app');
const port = process.env.PORT || 8080;
var logger = require('./middlewares/logger');

// Conexion database
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/generico', {
    useNewUrlParser: true
  })
  .then(() => {
    logger.info('Conected to mongodb://localhost:27017/generico');

    // Crear servidor
    app.listen(port, () => {
      logger.info('Server running in http://localhost:' + port);
    });
  })
  .catch(err => logger.error(err));
