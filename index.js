const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const taxisRoutes = require('./routes/taxis');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api', taxisRoutes);

const CSS_FILENAME = 'swagger-custom.css';
const CSS_PATH = path.join(__dirname, 'config', CSS_FILENAME);
const CSS_URL = '/api-docs/' + CSS_FILENAME; 

app.use('/api-docs', (req, res, next) => {
  res.type('text/css'); 
  express.static(path.join(__dirname, 'config'))(req, res, next);
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
  customCssUrl: CSS_URL
}));

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
