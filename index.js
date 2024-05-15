const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const taxisRoutes = require('./routes/taxis');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api', taxisRoutes);

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    swaggerUi.setup(swaggerDocument, { customCssUrl: CSS_URL })(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
