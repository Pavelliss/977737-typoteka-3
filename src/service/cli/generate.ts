import { customConsole, getRandomInt, shuffle } from '../../utils';
import { ExitCode } from '../../constants';
import * as fs from 'fs';

const DEFAULT_COUNT = '1';
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  'Продам книги Стивена Кинга.',
  'Продам новую приставку Sony Playstation 5.',
  'Продам отличную подборку фильмов на VHS.',
  'Куплю антиквариат.',
  'Куплю породистого кота.',
  'Продам коллекцию журналов «Огонёк».',
  'Отдам в хорошие руки подшивку «Мурзилка».',
  'Продам советскую посуду. Почти не разбита.',
  'Куплю детские санки.',
];

const DESCRIPTION = [
  'Товар в отличном состоянии.',
  'Пользовались бережно и только по большим праздникам.',
  'Продаю с болью в сердце...',
  'Бонусом отдам все аксессуары.',
  'Даю недельную гарантию.',
  'Если товар не понравится — верну всё до последней копейки.',
  'Это настоящая находка для коллекционера!',
  'Если найдёте дешевле — сброшу цену.',
  'Таких предложений больше нет!',
  'Две страницы заляпаны свежим кофе.',
  'При покупке с меня бесплатная доставка в черте города.',
  'Кажется, что это хрупкая вещь.',
  'Мой дед не мог её сломать.',
  'Кому нужен этот новый телефон, если тут такое...',
  'Не пытайтесь торговаться. Цену вещам я знаю.',
];

const CATEGORIES = ['Книги', 'Разное', 'Посуда', 'Игры', 'Животные', 'Журналы'];

const Price = {
  MIN: 1000,
  MAX: 100000,
};

const Picture = {
  MIN: 1,
  MAX: 16,
};

const TYPES = ['offer', 'sale'];

const generateAdvertisements = (count: number) => {
  return new Array(count).fill({}).map(() => ({
    type: TYPES[getRandomInt(0, TYPES.length - 1)],
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    description: shuffle(DESCRIPTION).slice(0, 5).join(' '),
    sum: getRandomInt(Price.MIN, Price.MAX),
    picture: `item${`${getRandomInt(Picture.MIN, Picture.MAX)}`.padStart(2, '0')}.jpg`,
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }));
};

const checkCountArticle = (count: string) => {
  if (Number.parseInt(count, 10) > MAX_COUNT) {
    customConsole.error(`Не больше 1000 публикаций`);
    process.exit(ExitCode.error);
  }
};

const generate = {
  name: '--generate',
  run: async (args = [DEFAULT_COUNT]) => {
    const [count] = args;
    checkCountArticle(count);

    const countOffer = Number.parseInt(count, 10);
    const content = JSON.stringify(generateAdvertisements(countOffer));

    try {
      await fs.promises.writeFile(FILE_NAME, content);
      return customConsole.info(`Operation success. File created.`);
    } catch (err) {
      return customConsole.error(`Can't write data to file...`);
    }
  },
};

export default generate;
