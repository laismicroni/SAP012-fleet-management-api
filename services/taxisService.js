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
