# Changelog

## Versão 1.0.0 - 2024-05-07

### Aprendizados da Sprint

- Configuração do ambiente com Node.js e Prisma.
- Criação e configuração do banco de dados PostgreSQL no Vercel.
- Utilização do Prisma para inserção de dados no banco de dados PostgreSQL.

### Adicionado

- Implementação da funcionalidade para carregar informações armazenadas
  em arquivos SQL em um banco de dados PostgreSQL no Vercel.
- Criação da tabela de taxis no banco de dados.
- Carregamento dos dados dos taxis para a tabela correspondente.
- Criação da tabela de trajectories no banco de dados.
- Carregamento dos dados das trajectories dos taxis para a tabela correspondente.

### Definição de pronto

- O banco de dados tem a tabela de taxis criada.
- A tabela de taxis tem os dados de taxis.sql carregados.
- O banco de dados tem a tabela de trajectories criada.
- A tabela de trajectories tem os dados de trajectories dos taxis carregados.

## Versão 1.0.1 - 2024-05-15
  
### Aprendizados da Sprint

- Utilização de stream para subir dados para o banco de dados.
- Criação e configuração de documentação pelo Swagger.

### Adicionado

- Endpoint para listar todos os táxis, fornecendo id e placa de cada um
  e seus testes unitários.
- Endpoint para consultar todas as localizações de um táxi, dado o seu id
  e uma data. Fornece latitude, longitude e timestamp.
- Endpoint para consultar a última localização reportada por cada táxi,
  fornecendo id, placa, latitude, longitude e timestamp.

### Corrigido

- O script de seed utilizando stream reduziu o tempo de inserção
  dos mais de 16 mil registros no banco de dados de 1 hora e 30 minutos para 5 minutos.

### Definição de pronto

- Todos os recursos planejados para a tarefa foram implementados.
- Os testes foram escritos e passaram com sucesso.
- A documentação foi atualizada, incluindo a documentação do Swagger.


## Versão 1.0.1 - 2024-05-15

### Aprendizados da Sprint

- Customização do CSS do Swagger.
- Uso do supertest para os testes unitários.

### Adicionado

- Testes unitários de todos os endpoints.

### Corrigido

- Deploy do swagger no Vercel.
- TaxiLocationsByDate ajustado para data específica e ordenado por hora.
