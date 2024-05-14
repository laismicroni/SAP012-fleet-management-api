const request = require('supertest');
const express = require('express');
const taxisRouter = require('../routes/taxis');

const app = express();
app.use(express.json());
app.use('/api', taxisRouter);

describe('GET /api/taxis', () => {
  test('should return status 200 and taxis data', async () => {
    const response = await request(app).get('/api/taxis');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array)); 
  });
});


