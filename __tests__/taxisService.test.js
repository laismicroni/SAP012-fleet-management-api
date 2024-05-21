const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const taxisService = require('../services/taxisService');

jest.mock('@prisma/client', () => {
    const mockPrismaClient = {
        taxis: {
            findMany: jest.fn(),
        },
        trajectories: {
            findMany: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('TaxisService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('listAllTaxis', () => {
        test('should return all taxis', async () => {
            const mockTaxis = [{ id: 1, plate: 'ABCD-1234' }];
            prisma.taxis.findMany.mockResolvedValueOnce(mockTaxis);

            const startIndex = 0;
            const endIndex = 10;
            const taxis = await taxisService.listAllTaxis(startIndex, endIndex);

            expect(taxis).toEqual(mockTaxis);
            expect(prisma.taxis.findMany).toHaveBeenCalledWith({
                skip: startIndex,
                take: endIndex - startIndex,
            });
        });

        test('should throw error when Prisma query fails', async () => {
            prisma.taxis.findMany.mockRejectedValueOnce(new Error('Erro no banco de dados'));

            const startIndex = 0;
            const endIndex = 10;
            await expect(taxisService.listAllTaxis(startIndex, endIndex)).rejects.toThrow('Erro ao listar táxis');
        });
    });

    describe('listTaxiLocationsByDate', () => {
        test('should return taxi locations by date', async () => {
            const mockLocations = [{ id: 1, latitude: 123, longitude: 456, date: new Date('2024-05-20') }];
            prisma.trajectories.findMany.mockResolvedValueOnce(mockLocations);

            const taxiId = 1;
            const date = '2024-05-20';
            const startIndex = 0;
            const endIndex = 10;
            const locations = await taxisService.listTaxiLocationsByDate(taxiId, date, startIndex, endIndex);

            expect(locations).toEqual(mockLocations);
            expect(prisma.trajectories.findMany).toHaveBeenCalledWith({
                where: {
                    taxi_id: taxiId,
                    date: {
                        gte: new Date(date),
                        lt: new Date('2024-05-21'),
                    }
                },
                orderBy: {
                    date: 'asc'
                },
                skip: startIndex,
                take: endIndex - startIndex,
            });
        });

        test('should throw error when Prisma query fails', async () => {
            prisma.trajectories.findMany.mockRejectedValueOnce(new Error('Erro no banco de dados'));

            const taxiId = 1;
            const date = '2024-05-20';
            const startIndex = 0;
            const endIndex = 10;
            await expect(taxisService.listTaxiLocationsByDate(taxiId, date, startIndex, endIndex)).rejects.toThrow('Erro ao listar localizações do táxi');
        });
    });

    describe('listLastTaxiLocations', () => {
        test('should return last taxi locations', async () => {
            const mockLastLocations = [{ id: 1, taxi: { plate: 'ABCD-1234' }, latitude: 123, longitude: 456, date: new Date('2024-05-20') }];
            prisma.trajectories.findMany.mockResolvedValueOnce(mockLastLocations);

            const startIndex = 0;
            const endIndex = 10;
            const locations = await taxisService.listLastTaxiLocations(startIndex, endIndex);

            expect(locations).toEqual(mockLastLocations);
            expect(prisma.trajectories.findMany).toHaveBeenCalledWith({
                orderBy: {
                    date: 'desc',
                },
                distinct: ['taxi_id'],
                include: {
                    taxi: {
                        select: {
                            plate: true,
                        },
                    },
                },
                skip: startIndex,
                take: endIndex - startIndex,
            });
        });

        test('should throw error when Prisma query fails', async () => {
            prisma.trajectories.findMany.mockRejectedValueOnce(new Error('Erro no banco de dados'));

            const startIndex = 0;
            const endIndex = 10;
            await expect(taxisService.listLastTaxiLocations(startIndex, endIndex)).rejects.toThrow('Erro ao listar as últimas localizações dos táxis');
        });
    });
});
