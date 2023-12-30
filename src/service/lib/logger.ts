import pino from 'pino';
import * as process from 'process';
import { Env } from '../../constants';

const LOG_FILE = `./logs/api.log`;
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? 'info' : 'error';
export const logger = pino(
  {
    name: `base-logger`,
    level: process.env.LOG_LEVEL || defaultLogLevel,
    transport: {
      target: 'pino-pretty',
    },
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE),
);

export function getLogger(options = {}) {
  return logger.child(options);
}
