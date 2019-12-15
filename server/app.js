'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var statusMonitor = require('express-status-monitor');
var httpLogger = require('./middlewares/http-logger');
var timeMeasurement = require('./middlewares/timeMeasurement');
var api = require('./routes/routes');

var app = express();

// Cargar Rutas
// var translate_route = require('./routes/translateRoute');

// Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(statusMonitor());
app.use(httpLogger);
app.use(timeMeasurement);

// CORS configurar cabeceras http
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});

app.use('/', api());

// Rutas
// app.use('/api', translate_route);

// Set Static Folder for prod client angular
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Exportar
module.exports = app;
