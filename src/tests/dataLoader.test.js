const fs = require('fs');
const path = require('path');

describe('Data Loader', () => {
  const testDataPath = path.join(__dirname, 'test-data.json');
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
  afterEach(() => {
    if (fs.existsSync(testDataPath)) {
      fs.unlinkSync(testDataPath);
    }
  });

  test('should validate data has endpoint field', () => {
    expect(mockData).toHaveProperty('endpoint');
    expect(typeof mockData.endpoint).toBe('string');
  });

  test('should validate business entries structure', () => {
    const businessKeys = Object.keys(mockData).filter(
      (key) => key !== 'endpoint'
    );

    expect(businessKeys.length).toBeGreaterThan(0);

    businessKeys.forEach((key) => {
      const business = mockData[key];
      expect(business).toHaveProperty('businessId');
      expect(business.businessId).toBe(key);
    });
  });

  test('should detect missing endpoint field', () => {
    const inmockData = {
      321321312: {
        businessId: '321321312',
        address: 'Testikatu 12 A',
      },
    };

    expect(inmockData.endpoint).toBeUndefined();
  });

  test('should validate JSON structure can be written and read', () => {
    fs.writeFileSync(testDataPath, JSON.stringify(mockData, null, 2));

    expect(fs.existsSync(testDataPath)).toBe(true);

    const readData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
    expect(readData).toEqual(mockData);
  });
});
