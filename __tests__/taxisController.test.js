const taxisController = require('../controllers/taxisController');
const taxisService = require('../services/taxisService');

jest.mock('../services/taxisService');

describe('Taxis Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { query: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('listAllTaxis - should return all taxis', async () => {
        const allTaxis = [{ id: 1, plate: 'ABCD-1234' }];
        taxisService.listAllTaxis.mockResolvedValueOnce(allTaxis);

        await taxisController.listAllTaxis(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(allTaxis);
    });

    test('listTaxiLocationsByDate - should return taxi locations by date', async () => {
        req.params.id = 1;
        req.query.date = '2024-05-20';
        const taxiLocations = [{ id: 1, latitude: 123, longitude: 456, date: '2024-05-20' }];
        taxisService.listTaxiLocationsByDate.mockResolvedValueOnce(taxiLocations);

        await taxisController.listTaxiLocationsByDate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(taxiLocations);
    });

    test('listLastTaxiLocations - should return last taxi locations with plate', async () => {
        const lastTaxiLocations = [{ id: 1, taxi: { plate: 'ABCD-1234' }, latitude: 123, longitude: 456, date: '2024-05-20' }];
        const expectedResponse = [{ id: 1, plate: 'ABCD-1234', latitude: 123, longitude: 456, date: '2024-05-20' }];
        taxisService.listLastTaxiLocations.mockResolvedValueOnce(lastTaxiLocations);

        await taxisController.listLastTaxiLocations(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    test('error handling - should return status 500 on internal server error', async () => {
        const errorMessage = 'Erro interno do servidor';
        taxisService.listAllTaxis.mockRejectedValueOnce(new Error(errorMessage));

        await taxisController.listAllTaxis(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
});
