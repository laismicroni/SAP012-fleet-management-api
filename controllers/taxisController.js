const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para listar todos os táxis
exports.listAllTaxis = async (req, res) => {
    try {
        const taxis = await prisma.taxis.findMany();
        res.status(200).json(taxis);
    } catch (error) {
        console.error('Erro ao listar táxis:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

