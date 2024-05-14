const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listAllTaxis = async (startIndex, endIndex) => {
    try {
        return await prisma.taxis.findMany({
            skip: startIndex,
            take: endIndex - startIndex,
        });
    } catch (error) {
        throw new Error('Erro ao listar táxis');
    }
};

exports.listTaxiLocationsByDate = async (taxiId, date, startIndex, endIndex) => {
    try {
        return await prisma.trajectories.findMany({
            where: {
                taxi_id: taxiId,
                date: {
                    gte: date, 
                }
            },
            skip: startIndex,
            take: endIndex - startIndex,
        });
    } catch (error) {
        throw new Error('Erro ao listar localizações do táxi');
    }
};

exports.listLastTaxiLocations = async (startIndex, endIndex) => {
    try {
        return await prisma.trajectories.findMany({
            orderBy: {
                date: 'desc', 
            },
            distinct: ['taxi_id'], 
            skip: startIndex,
            take: endIndex - startIndex,
        });
    } catch (error) {
        throw new Error('Erro ao listar as últimas localizações dos táxis');
    }
};
