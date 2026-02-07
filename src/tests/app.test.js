const request = require('supertest');
const express = require('express');
const app = express();

// Mock data
const mockData = {
  endpoint: '/api',
  321321312: {
    businessId: '321321312',
    address: 'Testikatu 12 A',
  },
  456456456: {
    businessId: '456456456',
    address: 'Katutesti 14 B',
  },
};

// Setup test endpoint
app.get(`${mockData.endpoint}/:businessId`, (req, res) => {
  const { businessId } = req.params;
  const business = mockData[businessId];

  if (business) {
    res.json(business);
  } else {
    res.status(404).json({ error: 'Business not found' });
  }
});

describe('Mock CRM API', () => {
  test('GET /api/:businessId - should return business data', async () => {
    const response = await request(app).get('/api/321321312');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      businessId: '321321312',
      address: 'Testikatu 12 A',
    });
  });

  test('GET /api/:businessId - should return 404 for non-existent business', async () => {
    const response = await request(app).get('/api/999999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Business not found' });
  });
});
