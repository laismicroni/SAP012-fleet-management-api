const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fleet Management API',
      version: '1.0.0',
      description: 'Documentação da API REST para o projeto de taxis',
    },
    components: {
      schemas: {
        taxis: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do táxi',
            },
            plate: {
              type: 'string',
              description: 'Placa do táxi',
            },
          },
        },
        trajectories: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da trajetória',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Data da trajetória',
            },
            latitude: {
              type: 'number',
              format: 'float',
              description: 'Latitude da trajetória',
            },
            longitude: {
              type: 'number',
              format: 'float',
              description: 'Longitude da trajetória',
            },
            taxi_id: {
              type: 'integer',
              description: 'ID do táxi associado a esta trajetória',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = function configureSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
