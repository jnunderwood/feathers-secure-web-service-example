'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;

const app = require('./app');
const employeeData  = require('../data/employeeData.json');
const userData = require('../data/userData.json');

const sequelize = app.get('sequelize');
const Employee = app.service('/employees');
const User = app.service('/users');

function loadData() {
  let p = sequelize.sync({ force: true });
  p = p.then(Employee.create(employeeData));
  p = p.then(User.create(userData));
  return p;
}

/**
 * returns a promise; will initialize the database and load
 * data when the node environment is 'development' or 'test'.
 */
var init = function() {
  app.logger.info(`Initializing ${env} environment`);
  if (env === 'development' || env === 'test') {
    return loadData();
  }
  return Promise.resolve();
};

var destroy = function() {
  app.logger.info(`Destroying ${env} environment`);
};

module.exports = {
  init: init,
  destroy: destroy
};
