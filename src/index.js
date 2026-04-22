'use strict';
import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db/index.js';
import { env } from './config/env.js';
import { logger } from './helper/logger.js';

const start = async () => {
  logger.info('Starting server...');
  await connectDB();
  logger.info('Connected to MongoDB');
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

start();
