'use strict';

const chai = require('chai');
const request = require('request');
const app = require('../../../src/app');
const bootstrap = require('../../../src/bootstrap');
// require('request-debug')(request);  // turn on request debugging

const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const adminCredentials = { 'username': 'admin', 'password': 'admin' };
var token;

describe('Employee restful service', function () {
  // this.timeout(5000);

  function requestToken(done) {
    request.post({
      url: 'http://localhost:3030/authentication',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminCredentials)
    },
    function (error, response, body) {
      token = JSON.parse(body).accessToken;
      app.logger.debug('token: ', token);
      done();
    });
  }

  // setup before all tests
  before('request authentication token', function (done) {
    this.server = app.listen(3030);               // start the server
    this.server.once('listening', function () {   // once listening do the following
      let p = bootstrap.init();                   // initialize data
      p.then(function() {
        requestToken(done);                       // request jwt
      });
    });
  });

  // teardown after all tests
  after(function (done) {
    bootstrap.destroy();
    this.server.close(function () {});
    done();
  });

  it('should GET 5 employees', function (done) {
    request.get({
      url: 'http://localhost:3030/api/v1/employee',
      auth: { 'bearer': token },
    },
    function (error, response, body) {
      let data = JSON.parse(body).data;
      response.statusCode.should.equal(200);
      data.should.be.an('array');
      data.length.should.equal(5);
      done();
    });
  });

  it('should GET 1 employee by ID', function (done) {
    request.get({
      url: 'http://localhost:3030/api/v1/employee/1',
      auth: { 'bearer': token },
    },
    function (error, response, b) {
      let body = JSON.parse(b);
      response.statusCode.should.equal(200);
      body.should.be.an('object');
      body.should.have.property('lastName');
      body.lastName.should.equal('Gillespie');
      done();
    });
  });

  it('should GET 2 employees by last name', function (done) {
    request.get({
      url: 'http://localhost:3030/api/v1/employee?lastName=Crosby',
      auth: { 'bearer': token },
    },
    function (error, response, body) {
      let data = JSON.parse(body).data;
      response.statusCode.should.equal(200);
      data.should.be.an('array');
      data.length.should.equal(2);
      data.should.have.deep.property('[0].lastName', 'Crosby');
      data.should.have.deep.property('[1].lastName', 'Crosby');
      done();
    });
  });

  it('should GET 2 employees like last name', function (done) {
    request.get({
      url: 'http://localhost:3030/api/v1/employee?lastName[$like]=Wi%',
      auth: { 'bearer': token },
    },
    function (error, response, body) {
      let data = JSON.parse(body).data;
      response.statusCode.should.equal(200);
      data.should.be.an('array');
      data.length.should.equal(2);
      data.should.have.deep.property('[0].lastName', 'Wilcox');
      data.should.have.deep.property('[1].lastName', 'William');
      done();
    });
  });

});
