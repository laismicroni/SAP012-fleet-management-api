const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerPath = path.resolve(__dirname, '../swagger.yaml');

const swaggerDocument = YAML.load(swaggerPath);

module.exports = function configureSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
