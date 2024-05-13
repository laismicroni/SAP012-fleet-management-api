const taxisService = require('../services/taxisService');

exports.listAllTaxis = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const allTaxis = await taxisService.listAllTaxis(startIndex, endIndex);
        res.status(200).json(allTaxis);
    } catch (error) {
        console.error('Erro ao listar táxis:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
