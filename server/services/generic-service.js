var Router = require('express');
var pluralize = require('pluralize');
var Utils = require('./utils');

const MAX_RESULTS = 100;

/**
  Generic controller that provides CRUD operations for a given Mongoose model
*/
module.exports = class GenericService {
  /**
    @param model Mongoose model
    @param key primary key of the model that will be used for searching, removing
    and reading
  */
  constructor(model, key) {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }

  create(data) {
    return this.model.create(data).then(modelInstance => {
      var response = {};
      response[this.modelName] = modelInstance;
      return response;
    });
  }

  read(id) {
    var filter = {};
    filter[this.key] = id;

    return this.model.findOne(filter).then(modelInstance => {
      var response = {};
      response[this.modelName] = modelInstance;
      return response;
    });
  }

  list() {
    return this.model
      .find({})
      .limit(MAX_RESULTS)
      .then(modelInstances => {
        var response = {};
        // response[this.modelName] = modelInstances;
        response[pluralize(this.modelName)] = modelInstances;
        return response;
      });
  }

  delete(id) {
    const filter = {};
    filter[this.key] = id;

    return this.model.remove(filter).then(() => {
      return {};
    });
  }

  update(id, data) {
    var filter = {};
    filter[this.key] = id;

    return this.model
      .findOne(filter)
      .then(modelInstance => {
        for (var attribute in data) {
          if (
            data.hasOwnProperty(attribute) &&
            attribute !== this.key &&
            attribute !== '_id'
          ) {
            modelInstance[attribute] = data[attribute];
          }
        }

        return modelInstance.save();
      })
      .then(modelInstance => {
        var response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }

  route() {
    const router = new Router();

    router.get('/', (req, res) => {
      this.list()
        .then(Utils.ok(res))
        .then(null, Utils.fail(res));
    });

    router.post('/', (req, res) => {
      this.create(req.body)
        .then(Utils.ok(res))
        .then(null, Utils.fail(res));
    });

    router.get('/:key', (req, res) => {
      this.read(req.params.key)
        .then(Utils.ok(res))
        .then(null, Utils.fail(res));
    });

    router.put('/:key', (req, res) => {
      this.update(req.params.key, req.body)
        .then(Utils.ok(res))
        .then(null, Utils.fail(res));
    });

    router.delete('/:key', (req, res) => {
      this.delete(req.params.key)
        .then(Utils.ok(res))
        .then(null, Utils.fail(res));
    });

    return router;
  }
};
