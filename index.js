const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const taxisRoutes = require('./routes/taxis');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api', taxisRoutes);

const CSS_PATH = path.join(__dirname, 'config', 'swagger-custom.css');
app.use('/swagger-custom.css', express.static(CSS_PATH));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '/swagger-custom.css' 
}));

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
