const request = require('supertest');
const app = require('../index'); 
const taxisService = require('../services/taxisService');

jest.mock('../services/taxisService');

describe('Taxis Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/taxis', () => {
        test('should return all taxis', async () => {
            const allTaxis = [{ id: 1, plate: 'ABCD-1234' }];
            taxisService.listAllTaxis.mockResolvedValueOnce(allTaxis);

            const response = await request(app).get('/api/taxis');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(allTaxis);
        });

        test('should return status 500 on internal server error', async () => {
            taxisService.listAllTaxis.mockRejectedValueOnce(new Error('Erro interno do servidor'));

            const response = await request(app).get('/api/taxis');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Erro interno do servidor' });
        });
    });

    describe('GET /api/taxis/:id/locations', () => {
        test('should return taxi locations by date', async () => {
            const taxiLocations = [{ id: 1, latitude: 123, longitude: 456, date: '2024-05-20' }];
            taxisService.listTaxiLocationsByDate.mockResolvedValueOnce(taxiLocations);

            const response = await request(app).get('/api/taxis/1/locations').query({ date: '2024-05-20' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(taxiLocations);
        });

        test('should return status 500 on internal server error', async () => {
            taxisService.listTaxiLocationsByDate.mockRejectedValueOnce(new Error('Erro interno do servidor'));

            const response = await request(app).get('/api/taxis/1/locations').query({ date: '2024-05-20' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Erro interno do servidor' });
        });
    });

    describe('GET /api/taxis/last-locations', () => {
        test('should return last taxi locations with plate', async () => {
            const lastTaxiLocations = [{ id: 1, taxi: { plate: 'ABCD-1234' }, latitude: 123, longitude: 456, date: '2024-05-20' }];
            const expectedResponse = [{ id: 1, plate: 'ABCD-1234', latitude: 123, longitude: 456, date: '2024-05-20' }];
            taxisService.listLastTaxiLocations.mockResolvedValueOnce(lastTaxiLocations);

            const response = await request(app).get('/api/taxis/last-locations');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(expectedResponse);
        });

        test('should return status 500 on internal server error', async () => {
            taxisService.listLastTaxiLocations.mockRejectedValueOnce(new Error('Erro interno do servidor'));

            const response = await request(app).get('/api/taxis/last-locations');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Erro interno do servidor' });
        });
    });
});
