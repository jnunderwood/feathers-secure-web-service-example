'use strict';

const app = require('./app');
const bootstrap = require('./bootstrap');

const port = app.get('port');
const server = app.listen(port);

server.on('listening', function() {
  var p = bootstrap.init();
  p.then(function() {
    return app.logger.info(`Feathers application started on ${app.get('host')}:${port}`);
  });
});
