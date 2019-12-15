var express = require('express');
var UserController = require('../controllers/userController');
var logger = require('../middlewares/logger');

api = function() {
  var api = express.Router();
  api.use('/user/', new UserController().route());
  return api;
};

module.exports = api;
