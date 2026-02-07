const express = require('express');
const logger = require('./utils/logger');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
});
