import pino from 'pino';

export const logger = pino({
  name: `base-logger`,
  level: `info`,
  transport: {
    target: 'pino-pretty',
  },
});

export function getLogger(options = {}) {
  return logger.child(options);
}
