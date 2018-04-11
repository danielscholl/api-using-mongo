const os = require('os');
const hostname = os.hostname();
const pkg = require('../package.json');

module.exports.routes = [
  {
    method: 'GET',
    path: '/about',
    config: {
    description: 'Get API Version',
    notes: 'API Version Information',
    tags: ['api']
  },
    handler: function (request, reply) {
      reply({
        statusCode: 200,
        message: 'successful operation',
        data: { hostname: hostname, name: pkg.name, version: pkg.version }
      });
    },
  }];
