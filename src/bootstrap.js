'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;

const app = require('./app');
const employeeData  = require('../data/employeeData.json');
const userData = require('../data/userData.json');

const sequelize = app.get('sequelize');
const Employee = app.service('/api/v1/employee');
const User = app.service('/users');

function loadData() {
  let p = sequelize.sync({ force: true });
  p = p.then(function() {
    return Employee.create(employeeData);
  });
  p = p.then(function() {
    return User.create(userData);
  });
  return p;
}

/**
 * Initializes the database and loads data when the
 * node environment is 'development' or 'test'.
 *
 * @returns a Promise
 */
function init() {
  app.logger.info(`Initializing ${env} environment`);
  if (env === 'development' || env === 'test') {
    return loadData();
  }
  return Promise.resolve();
}

function destroy() {
  app.logger.info(`Destroying ${env} environment`);
}

module.exports = {
  init: init,
  destroy: destroy
};
