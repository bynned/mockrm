const fs = require('fs');
const path = require('path');
const logger = require('./logger');

function loadBusinessData() {
  const dataPath = path.join(__dirname, '../../data.json');

  try {
    if (!fs.existsSync(dataPath)) {
      logger.error('data.json file not found at ' + dataPath);
      throw new Error('data.json file not found');
    }

    const data = require('../../data.json');

    if (!data.endpoint) {
      throw new Error('data.json missing required "endpoint" field');
    }

    logger.info('Business data loaded successfully');
    logger.debug('Loaded data: ' + JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    logger.error('Failed to load business data: ' + error.message);
    throw error;
  }
}

module.exports = { loadBusinessData };
