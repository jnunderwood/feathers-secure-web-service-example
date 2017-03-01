'use strict';

const service = require('feathers-sequelize');
const employee = require('./employee-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: employee(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/employees', service(options));

  // Get our initialized service so that we can bind hooks
  const employeeService = app.service('/employees');

  // Set up our before hooks
  employeeService.before(hooks.before);

  // Set up our after hooks
  employeeService.after(hooks.after);
};
