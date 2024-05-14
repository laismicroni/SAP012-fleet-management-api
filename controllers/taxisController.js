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
        const taxiId = parseInt(req.params.id);
        const date = new Date(req.query.date); 
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

        const locationsWithPlate = lastTaxiLocations.map((location) => ({
            id: location.id,
            plate: location.taxi.plate, 
            latitude: location.latitude,
            longitude: location.longitude,
            date: location.date,
        }));

        res.status(200).json(locationsWithPlate);
    } catch (error) {
        console.error('Erro ao listar as últimas localizações dos táxis:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};