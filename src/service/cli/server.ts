import { API_PREFIX, DEFAULT_PORT, HttpCode } from '../../constants';
import express, { NextFunction, Request, Response } from 'express';
import router from '../api';
import { getLogger } from '../lib/logger';

const app = express();
const logger = getLogger({ name: 'api' });

app.use(API_PREFIX, router);
app.use(express.json());
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});
// eslint-disable-next-line no-unused-vars
app.use((err: Error, _req: Request, _res: Response, _next: NextFunction) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

const server = {
  name: '--server',
  run: (args = [`${DEFAULT_PORT}`]) => {
    const [customPort] = args;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port, () => {
      logger.info(`Ожидаю соединений на ${port}`);
    });
    app.on('error', (err) => {
      logger.error(`Ошибка при создании сервера: ${err}`);
    });
  },
};

export default server;
