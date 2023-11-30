import { customConsole } from '../../utils';
import { API_PREFIX, HttpCode } from '../../constants';
import express from 'express';
import router from '../api';

const DEFAULT_PORT = 3000;

const app = express();

app.use(API_PREFIX, router);
app.use(express.json());
app.use((_, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

const server = {
  name: '--server',
  run: (args = [`${DEFAULT_PORT}`]) => {
    const [customPort] = args;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port, () => {
      customConsole.success(`Ожидаю соединений на ${port}`);
    });
    app.on('error', (err) => {
      customConsole.error(`Ошибка при создании сервера: ${err}`);
    });
  },
};

export default server;
