const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Swagger = require('hapi-swagger');
const Package = require('./package');
const Routes = require('./routes');

// Setup the Swagger Documentation Options
const SwaggerOptions = {
  info: {
    'title': 'API Using Mongo',
    'version': Package.version,
  },
  documentationPath: '/api/'
};

// Create Server Object
const server = new Hapi.Server();

server.connection({
  port: process.env.API_PORT || 3000,
  routes: {
       cors: true
  }
});

server.register([
  Inert,
  Vision,
  {
    register: Swagger,
    options: SwaggerOptions
  }], (err) => {
    if (err) {
      server.log(['error'], 'hapi-swagger load error: ' + err);
    } else {
      server.log(['start'], 'hapi-swagger interface loaded');
    }
  });

server.route(Routes.routes);

// =============== Start our Server =======================
// Lets start the server
server.start(() => {
  console.log('Server running at:', server.info.uri);
});
