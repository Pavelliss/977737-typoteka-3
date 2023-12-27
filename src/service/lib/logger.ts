import pino from 'pino';

export const logger = pino({
  name: `base-logger`,
  level: `info`,
});

export function getLogger(options = {}) {
  return logger.child(options);
}
