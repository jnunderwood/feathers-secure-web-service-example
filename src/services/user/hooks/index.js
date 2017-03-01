'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const commonHooks = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const permissions = require('feathers-permissions');

exports.before = {
  all:    [
  ],
  find:   [
    auth.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  get:    [
    auth.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
  ],
  create: [
    auth.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ],
  update: [
    auth.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ],
  patch:  [
    auth.hooks.authenticate('jwt'),
    permissions.hooks.checkPermissions({ service: 'users' }),
    permissions.hooks.isPermitted(),
    local.hooks.hashPassword()
  ],
};

exports.after = {
  all:    [hooks.remove('password')],
  find:   [],
  get:    [],
  create: [],
  update: [],
  patch:  [],
  remove: []
};
