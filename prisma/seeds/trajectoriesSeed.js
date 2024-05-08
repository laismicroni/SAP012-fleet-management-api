const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertTrajectoriesFromSQLFiles() {
    try {
        const directoryPath = 'prisma/data/trajectories';

        const fileNames = fs.readdirSync(directoryPath);

        for (const fileName of fileNames) {
            const filePath = `${directoryPath}/${fileName}`;
            console.log(`Inserindo dados do arquivo ${filePath}...`);

            // Lê os comandos SQL do arquivo
            const fileContent = fs.readFileSync(filePath, 'utf8');

            const commands = fileContent.split(';');

            for (const command of commands) {
                if (command.trim() !== '') {
                    const [taxi_id, date, latitude, longitude] = parseTrajectorySQLCommand(command);
                    if (taxi_id && date && latitude && longitude) {
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
                        } else {
                            console.log(`Trajeto para taxi ${taxi_id} na data ${date} já existe, pulando inserção.`);
                        }
                    }
                }
            }

            console.log(`Inserção de dados do arquivo ${filePath} concluída.`);
        }

        console.log('Inserção de todos os dados de trajetórias concluída com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir dados de trajetórias:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Conexão com o banco de dados encerrada.');
    }
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
