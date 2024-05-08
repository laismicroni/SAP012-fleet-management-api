const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertTrajectoriesFromSQLFiles() {
    try {
        const directoryPath = 'prisma/data/trajectories';
        const fileNames = fs.readdirSync(directoryPath);

        for (const fileName of fileNames) {
            const filePath = `${directoryPath}/${fileName}`;

            await processFile(filePath);
        }

        console.log('Inserção de todos os dados de trajetórias concluída com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir dados de trajetórias:', error);
    } finally {
        try {
            await prisma.$disconnect();
        } catch (disconnectError) {
            console.error('Erro ao encerrar conexão com o banco de dados:', disconnectError);
        }
    }
}

async function processFile(filePath) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
        let buffer = '';

        readStream.on('data', async (chunk) => {
            buffer += chunk;
            const commands = buffer.split(';');
            buffer = commands.pop();

            for (const command of commands) {
                if (command.trim() !== '') {
                    const [taxi_id, date, latitude, longitude] = parseTrajectorySQLCommand(command);
                    if (taxi_id && date && latitude && longitude) {
                        try {
                            const existingTrajectory = await prisma.trajectories.findFirst({
                                where: { taxi_id: parseInt(taxi_id), date: new Date(date) },
                            });
                            if (!existingTrajectory) {
                                await prisma.trajectories.create({
                                    data: {
                                        taxi_id: parseInt(taxi_id),
                                        date: new Date(date),
                                        latitude: parseFloat(latitude),
                                        longitude: parseFloat(longitude),
                                    },
                                });
                            }
                        } catch (createError) {
                            reject(createError);
                        }
                    }
                }
            }
        });

        readStream.on('end', () => {
            resolve();
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
}

function parseTrajectorySQLCommand(command) {
    const regex = /INSERT INTO trajectories \(taxi_id, date, latitude, longitude \) VALUES \('(\d+)','([\d\s:-]+)',([\d.-]+),([\d.-]+)\)/;
    const matches = command.match(regex);
    if (matches) {
        const taxi_id = matches[1];
        const date = matches[2];
        const latitude = matches[3];
        const longitude = matches[4];
        return [taxi_id, date, latitude, longitude];
    } else {
        return [null, null, null, null];
    }
}

insertTrajectoriesFromSQLFiles();
