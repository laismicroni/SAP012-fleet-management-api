# Fleet Management API

Esta é a API de gerenciamento de frotas, projetada para fornecer informações
sobre táxis, suas localizações e trajetórias.

## Documentação

A documentação completa da API pode ser encontrada no Swagger [aqui](https://sap-012-fleet-management-api.vercel.app/api-docs).

## Tecnologias Utilizadas

![NodeJs](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Funcionalidades

- **Listagem de Táxis**: Recupera uma lista paginada de todos os táxis.
- **Localizações por Data**: Recupera todas as localizações de um táxi
específico em uma data específica.
- **Últimas Localizações**: Recupera a última localização reportada por cada táxi.

## Endpoints

### Listar todos os táxis

- GET /api/taxis
- **Descrição**: Retorna uma lista paginada de todos os táxis.
- **Parâmetros de Query**:
  - `page` (opcional): Número da página a ser recuperada.
  - `limit` (opcional): Número máximo de registros por página.

### Consultar todas as localizações de um táxi por data

- GET /api/taxis/{id}/locations
- **Descrição**: Retorna uma lista paginada de todas as localizações de um táxi
em uma data específica ordenada pelo horário.
- **Parâmetros de Path**:
  - `id` (obrigatório): ID do táxi.
- **Parâmetros de Query**:
  - `date` (opcional): Data para consulta das localizações (formato: YYYY-MM-DD).
  - `page` (opcional): Número da página a ser recuperada.
  - `limit` (opcional): Número máximo de registros por página.

### Consultar a última localização reportada por cada táxi

- GET /api/taxis/last-locations
- **Descrição**: Retorna uma lista paginada da última localização de cada táxi.
- **Parâmetros de Query**:
  - `page` (opcional): Número da página a ser recuperada.
  - `limit` (opcional): Número máximo de registros por página.

## Como Executar

### Pré-requisitos

- Node.js
- NPM

### Instalação

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/laismicroni/SAP012-fleet-management-api.git
   ```

2. **Instale as dependências:**

   ```sh
   npm install
   ```

3. **Configure o banco de dados Prisma:**

   ```sh
   npx prisma generate
   ```

4. **Inicie o servidor:**

   ```sh
   npm start
   ```

- O servidor estará disponível em <http://localhost:5000>.

### Testes

- Foram realizados testes unitários utilizando Jest e Supertest.
Para rodar os testes, utilize o comando:

```sh
npm test
```
