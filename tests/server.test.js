const request = require('supertest');
const app = require('./server');

describe('API routes', () => {
    it('responds to /api', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
    });
});
