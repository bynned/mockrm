const express = require('express');
const logger = require('./utils/logger');
const businessData = require('../data.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.get(`${businessData.endpoint}/:businessId`, (req, res) => {
  const { businessId } = req.params;

  logger.debug(`Received request for businessId: ${businessId}`);

  const business = businessData[businessId];

  if (business) {
    logger.info(`Found business: ${businessId}`);
    res.json(business);
  } else {
    logger.error(`Business not found: ${businessId}`);
    res.status(404).json({ error: 'Business not found' });
  }
});

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
  logger.info(`Endpoint: ${businessData.endpoint}/:businessId`);
});
