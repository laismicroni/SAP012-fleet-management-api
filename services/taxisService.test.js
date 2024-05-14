// taxisService.test.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { listAllTaxis } = require('./taxisService'); // Importando a função que queremos testar

describe('listAllTaxis', () => {
    it('deve retornar uma lista de táxis', async () => {
        const startIndex = 0;
        const endIndex = 10;

        const result = await listAllTaxis(startIndex, endIndex);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(endIndex - startIndex);
    });

    it('deve lançar um erro ao listar táxis', async () => {
        const startIndex = 0;
        const endIndex = 10;

        jest.spyOn(prisma.taxis, 'findMany').mockRejectedValue(new Error('Erro ao listar táxis'));

        try {
            await listAllTaxis(startIndex, endIndex);
        } catch (error) {
            expect(error.message).toBe('Erro ao listar táxis');
        }
    });
});