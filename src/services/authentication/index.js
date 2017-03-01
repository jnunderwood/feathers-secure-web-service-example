'use strict';

const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');
const service = require('feathers-sequelize');
const user = require('../user/user-model');

module.exports = function() {
  const app = this;

  const options = {
    Model: user(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  let config = app.get('auth');

  // The services you are setting the `entity` param
  // for needs to be registered before authentication
  app.use('/users', service(options))
    .configure(auth(config))
    .configure(local())
    .configure(jwt());

  app.service('authentication').hooks({
    before: {
      create: [ auth.hooks.authenticate(['local']) ],
      // remove: [ auth.hooks.authenticate('jwt') ]
    }
  });
};
