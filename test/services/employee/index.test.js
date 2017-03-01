'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('Employee service', function () {

  it('registered the employees service', function (done) {
    assert.ok(app.service('employees'));
    done();
  });

});
