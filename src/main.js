const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const { loadBusinessData } = require('./utils/dataLoader');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const dataPath = path.join(__dirname, '../data.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
};

app.use(cors(corsOptions));

let businessData;
try {
  businessData = loadBusinessData();
} catch (error) {
  process.exit(1);
}

app.get('/console', (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const pretty = JSON.stringify(JSON.parse(raw), null, 2);
    res.render('index', { jsonData: pretty, message: null, messageType: null });
  } catch (err) {
    res.render('index', {
      jsonData: '{}',
      message: 'Failed to load data.json',
      messageType: 'error',
    });
  }
});

app.post('/console', express.urlencoded({ extended: true }), (req, res) => {
  try {
    const parsed = JSON.parse(req.body.jsonData);
    fs.writeFileSync(dataPath, JSON.stringify(parsed, null, 2), 'utf-8');
    res.render('index', {
      jsonData: JSON.stringify(parsed, null, 2),
      message: 'Saved successfully',
      messageType: 'success',
    });
  } catch (err) {
    res.render('index', {
      jsonData: req.body.jsonData,
      message: 'Invalid JSON — not saved',
      messageType: 'error',
    });
  }
});

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
  logger.debug(`CORS origin: ${corsOptions.origin}`);
});
