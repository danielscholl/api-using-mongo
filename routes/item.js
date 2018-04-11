const Joi = require('joi');
const Service = require('../lib/service');

const config = {
  db: {
    host: process.env.DB_HOST || ['localhost'],
    port: process.env.DB_PORT || 27017
  }
};

module.exports.routes = [
  {
    method: 'GET',
    path: '/api/item/',
    config: {
      description: 'Get All Items',
      notes: 'Get Item List',
      tags: ['api'],
      validate: {
        params: {
          pageSize: Joi.number().optional(),
          pageIndex: Joi.number().optional()
        }
      }
    },
    handler: (req, response) => {
      const service = new Service(config);
      service.list(req.params, (err, result) => {
        if (err) {
          response({ statusCode: 500, message: err });
        } else {
          response({ statusCode: 200, message: 'successful operation', data: result.data });
        }
      });
    },
  },
  {
    method: 'GET',
    path: '/api/item/{id?}',
    config: {
      description: 'Get an Item',
      notes: 'Get an Item',
      tags: ['api'],
      validate: {
        params: { id: Joi.string().required() }
      }
    },
    handler: (request, response) => {
      const service = new Service(config);
      service.read({ id: request.params.id }, (err, result) => {
        if (err) response({ statusCode: 500, message: err });

        if (!result.success) {
          response({ statusCode: 404, message: 'Not Found' });
        } else {
          response({
            statusCode: 200,
            message: 'successful operation',
            data: result.data
          });
        }
      });
    }
  },
  {
    method: 'POST',
    path: '/api/item/',
    config: {
      description: 'Add an Item',
      notes: 'Save an Item',
      tags: ['api'],
      validate: {
        payload: {
          name: Joi.string().default('New Item'),
          description: Joi.string().default('New Item Description'),
          active: Joi.boolean().default(true),
          list: Joi.array().optional()
        }
      }
    },
    handler: (request, response) => {
      const service = new Service(config);
      service.create(request.payload, (err, result) => {
        if (err) {
          response({ statusCode: 500, message: err });
        } else {
          response({ statusCode: 200, message: 'successful operation', data: result.data });
        }
      });
    }
  },
  {
    method: 'DELETE',
    path: '/api/item/{id?}',
    config: {
      description: 'Delete an Item',
      notes: 'Remove an Item',
      tags: ['api'],
      validate: {
        params: { id: Joi.string().required() }
      }
    },
    handler: (request, response) => {
      const service = new Service(config);
      const params = { id: request.params.id };

      service.delete(params, (err, result) => {
        if (err) response({ statusCode: 500, message: err });

        if (!result.success) {
          response({ statusCode: 404, message: 'Not Found' });
        } else {
          response({
            statusCode: 200,
            success: result.success,
            message: result.message,
            item: result.data
          });
        }
      });
    }
  },
  {
    method: 'PUT',
    path: '/api/item/{id?}',
    config: {
      description: 'Update an Item',
      notes: 'Modify the item',
      tags: ['api'],
      validate: {
        params: { id: Joi.string().required() },
        payload: {
          name: Joi.string().default('New Item'),
          description: Joi.string().default('New Item Description'),
          active: Joi.boolean().default(true),
          list: Joi.array().optional()
        }
      }
    },
    handler: (request, response) => {
      const service = new Service(config);
      let data = request.payload;
      data.id = request.params.id;

      service.update(data, (err, result) => {
        if (err) {
          response({ statusCode: 500, message: err });
        } else {
          response({
            statusCode: 200,
            success: result.success,
            message: result.message,
            item: result.data
          });
        }
      });
    }
  }
];
