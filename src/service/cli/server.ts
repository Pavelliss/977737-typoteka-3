import * as http from 'http';
import { customConsole } from '../../utils';
import * as fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { HttpCode } from '../../constants';

type TParam = {
  res: ServerResponse;
  statusCode: (typeof HttpCode)[keyof typeof HttpCode];
  message: string;
};
type TMock = {
  type: string;
  title: string;
  description: string;
  sum: number;
  picture: string;
  category: string[];
};

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const sendResponse = (param: TParam) => {
  const { res, statusCode, message } = param;
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': 'text/html; charset=UTF-8',
  });

  res.end(template);
  // 'Content-Type': `text/html; charset=UTF-8`,
};

const onClientConnect = async (req: IncomingMessage, res: ServerResponse) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case '/':
      try {
        const fileContent = await fs.promises.readFile(FILENAME);
        const mock: TMock[] = JSON.parse(`${fileContent}`);
        const message = mock.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse({ res, statusCode: HttpCode.OK, message });
      } catch (err) {
        sendResponse({ res, statusCode: HttpCode.NOT_FOUND, message: notFoundMessageText });
      }
      break;
    default:
      sendResponse({ res, statusCode: HttpCode.NOT_FOUND, message: notFoundMessageText });
      break;
  }
};

const server = {
  name: '--server',
  run: (args = [`${DEFAULT_PORT}`]) => {
    const [customPort] = args;

    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on('listening', () => {
        customConsole.success(`Ожидаю соединений на ${port}`);
      })
      .on('error', ({ message }) => {
        customConsole.error(`Ошибка при создании сервера: ${message}`);
      });
  },
};

export default server;
