const taxisController = require('../controllers/taxisController');
const taxisService = require('../services/taxisService');

jest.mock('../services/taxisService');

describe('taxisController', () => {
  test('should return status 200 and taxis data', async () => {
    const req = {
      query: { page: 1 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockTaxisData = [{ id: 1, name: 'Taxi 1' }, { id: 2, name: 'Taxi 2' }];

    taxisService.listAllTaxis.mockResolvedValue(mockTaxisData);

    await taxisController.listAllTaxis(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTaxisData);
  });

  test('should return status 500 if an error occurs', async () => {
    const req = {
      query: {}
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulando um erro ao passar um objeto de solicitação sem a propriedade 'page'
    taxisService.listAllTaxis.mockRejectedValue(new Error('Erro ao listar táxis'));

    await taxisController.listAllTaxis(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro interno do servidor' });
  });
});
