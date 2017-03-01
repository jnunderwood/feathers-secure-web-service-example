'use strict';

// employee-model.js - A sequelize model
//
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const employee = sequelize.define('employees', {
    username:  { type: Sequelize.STRING, allowNull: false, unique: true },
    lastName:  { type: Sequelize.STRING, allowNull: false },
    firstName: { type: Sequelize.STRING, allowNull: false }
  }, {
    freezeTableName: false
  });

  return employee;
};
