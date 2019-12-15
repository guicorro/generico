var GenericService = require('../services/generic-service');
var User = require('../models/user');
// import GenericService from '../services/generic-service';

module.exports = class UserController extends GenericService {
  constructor() {
    super(User, '_id');
  }
};
