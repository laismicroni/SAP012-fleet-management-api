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
exports.listTaxiLocationsByDate = async (req, res) => {
    try {
        const taxiId = parseInt(req.params.id); // Captura o id do táxi dos parâmetros da URL
        const date = new Date(req.query.date); // Captura a data dos parâmetros da URL
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const taxiLocations = await taxisService.listTaxiLocationsByDate(taxiId, date, startIndex, endIndex);
        res.status(200).json(taxiLocations);
    } catch (error) {
        console.error('Erro ao listar localizações do táxi:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.listLastTaxiLocations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const lastTaxiLocations = await taxisService.listLastTaxiLocations(startIndex, endIndex);
        res.status(200).json(lastTaxiLocations);
    } catch (error) {
        console.error('Erro ao listar as últimas localizações dos táxis:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};