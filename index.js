const express = require('express');
const swaggerConfig = require('./config/swaggerConfig');
const taxisRoutes = require('./routes/taxis');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar o Swagger
swaggerConfig(app);

// Adicionar as rotas
app.use('/api', taxisRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
