import { customConsole, getRandomInt, shuffle } from '../../utils';
import { ExitCode } from '../../constants';
import * as fs from 'fs';
import { nanoid } from 'nanoid';

type TAdvertisementParam = {
  count: number;
  titles: string[];
  categories: string[];
  sentences: string[];
  comments: string[];
};

const MAX_COUNT = 1000;
const MAX_ID_LENGTH = 6;

const DEFAULT_COUNT = '1';
const FILE_NAME = `mocks.json`;
const FILE_SENTENCES_PATH = './data/sentences.txt';
const FILE_TITLES_PATH = './data/titles.txt';
const FILE_CATEGORIES_PATH = './data/categories.txt';
const FILE_COMMENTS_PATH = './data/comments.txt';

const Price = {
  MIN: 1000,
  MAX: 100000,
};

const Picture = {
  MIN: 1,
  MAX: 16,
};

const TYPES = ['offer', 'sale'];

const readContent = async (path: string): Promise<string[]> => {
  try {
    const content = await fs.promises.readFile(path, 'utf-8');
    return content.trim().split('\n');
  } catch (err) {
    customConsole.error(err);
    return [];
  }
};

const generateComments = (comments: string[], count: number) => {
  return new Array(count).fill('').map(() => {
    return {
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, count).join(' '),
    };
  });
};

const generateAdvertisements = (param: TAdvertisementParam) => {
  const { count, titles, categories, sentences, comments } = param;

  return new Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    type: TYPES[getRandomInt(0, TYPES.length - 1)],
    title: titles[getRandomInt(0, titles.length - 1)],
    description: shuffle(sentences).slice(0, 5).join(' '),
    sum: getRandomInt(Price.MIN, Price.MAX),
    picture: `item${`${getRandomInt(Picture.MIN, Picture.MAX)}`.padStart(2, '0')}.jpg`,
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: generateComments(comments, getRandomInt(1, comments.length - 1)),
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
    const [countOffer] = args;
    checkCountArticle(countOffer);

    const count = Number.parseInt(countOffer, 10);

    // Считываем контент из файлов
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const param: TAdvertisementParam = {
      count,
      sentences,
      titles,
      categories,
      comments,
    };

    const content = JSON.stringify(generateAdvertisements(param));

    try {
      await fs.promises.writeFile(FILE_NAME, content);
      return customConsole.info(`Operation success. File created.`);
    } catch (err) {
      return customConsole.error(`Can't write data to file...`);
    }
  },
};

export default generate;
