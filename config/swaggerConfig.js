const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const swaggerPath = path.resolve(__dirname, '../swagger.yaml');

const swaggerDocument = fs.readFileSync(swaggerPath, 'utf8');

module.exports = function configureSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(JSON.parse(swaggerDocument)));
};
