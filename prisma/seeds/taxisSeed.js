const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertDataFromSQLFile() {
    try {
        const fileStream = fs.createReadStream('prisma/data/taxis/taxis.sql', { encoding: 'utf8' });

        let sqlCommand = '';
        for await (const chunk of fileStream) {
            sqlCommand += chunk;
            const commands = sqlCommand.split(';');
            for (const command of commands) {
                if (command.trim() !== '') {
                    const [id, plate] = parseSQLCommand(command);
                    if (id) {
                        const existingTaxi = await prisma.taxis.findUnique({
                            where: { id: parseInt(id) },
                        });
                        if (!existingTaxi) {
                            await prisma.taxis.create({
                                data: {
                                    id: parseInt(id),
                                    plate: plate.trim(),
                                },
                            });
                        } else {
                            console.log(`Registro com id ${id} já existe, pulando inserção.`);
                        }
                    }
                }
            }
            sqlCommand = commands.pop(); 
        }

        console.log('Inserção de dados concluída com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Conexão com o banco de dados encerrada.');
    }
}

function parseSQLCommand(command) {
    const regex = /INSERT INTO taxis \(id, plate\) VALUES \((\d+),'([^']+)'\)/;
    const matches = command.match(regex);
    if (matches) {
        const id = matches[1];
        const plate = matches[2];
        return [id, plate];
    } else {
        return [null, null];
    }
}

insertDataFromSQLFile();
