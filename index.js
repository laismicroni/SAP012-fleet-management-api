const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
const taxisRoutes = require('./routes/taxis');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Adicionar as rotas
app.use('/api', taxisRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
