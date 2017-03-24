'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('Employee service', function () {

  it('registered the employee service', function (done) {
    assert.ok(app.service('/api/v1/employee'));
    done();
  });

});
