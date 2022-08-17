// require('dotenv').config();
import * as dotenv from 'dotenv'
dotenv.config();

import app from './app';

import http from 'http';
const port = process.env.PORT || 3000;
import { Logger } from './services';
const logger = Logger.getInstance();

http.createServer(app).listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});
