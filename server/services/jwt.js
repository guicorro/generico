'use strict';

var jwt = require('jwt-simple'); // Trabajar con token
var moment = require('moment'); // Sirve para generar fechas
var secret = 'clave_secreta';

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment()
      .add(1, 'hour')
      .unix()
  };

  return jwt.encode(payload, secret);
};
