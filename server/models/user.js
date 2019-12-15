'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  nick: String,
  email: String,
  password: String,
  passwordConfirmation: String,
  role: String,
  image: String,
  birthday: Date,
  address: Array,
  country: String
});

module.exports = mongoose.model('User', UserSchema);
