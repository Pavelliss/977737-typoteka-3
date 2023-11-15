import { customConsole } from '../../utils';

const help = {
  name: `--help`,
  run() {
    const text = `
    Программа запускает http-сервер и формирует файл с данными для api.

    Гайд:
      server <command>

      Команды:

      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
    `;

    customConsole.info(text);
  },
};

export default help;
