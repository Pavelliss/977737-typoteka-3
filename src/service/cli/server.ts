import { customConsole } from '../../utils';
import * as fs from 'fs';
import { HttpCode } from '../../constants';
import express from 'express';

type TMock = {
  type: string;
  title: string;
  description: string;
  sum: number;
  picture: string;
  category: string[];
};

const DEFAULT_PORT = 3000;
const FILE_NAME = `mocks.json`;

const app = express();

app.use(express.json());

app.get('/posts', async (_, res) => {
  try {
    const fileContent = await fs.promises.readFile(FILE_NAME);
    const mock: TMock[] = JSON.parse(`${fileContent}`);
    res.send(mock);
  } catch {
    res.send([]);
  }
});

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
