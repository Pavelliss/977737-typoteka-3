import { TArticle } from '../../types';
import express from 'express';
import article from './article';
import Article from '../data-service/article';
import supertest from 'supertest';
import { Url } from './constants';
import { HttpCode } from '../../constants';

const ARTICLE_ID = 'HL8m2C';
const ARTICLE_TITLE = 'Куплю антиквариат.';
const mocks: TArticle[] = [
  {
    id: ARTICLE_ID,
    type: 'sale',
    title: ARTICLE_TITLE,
    description:
      'Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Кажется, что это хрупкая вещь. Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города.',
    sum: 91437,
    picture: 'item13.jpg',
    categories: ['Игры', 'Животные', 'Книги', 'Разное'],
    comments: [
      {
        id: 'FGu4Zg',
        text: 'Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Планируете записать видосик на эту тему? Плюсую, но слишком много буквы!',
      },
      {
        id: 'vgQQgo',
        text: 'Хочу такую же футболку :-) Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Мне кажется или я уже читал это где-то?',
      },
      {
        id: 'TIh553',
        text: 'Планируете записать видосик на эту тему? Согласен с автором! Совсем немного... Это где ж такие красоты?',
      },
      {
        id: '_69V_G',
        text: 'Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты? Плюсую, но слишком много буквы!',
      },
    ],
  },
];

const createApi = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mocks));

  app.use(express.json());
  article(app, new Article(cloneData));

  return app;
};

describe('API returns a list of all articles', () => {
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app).get(Url.articles);
  });

  test('Status code 200', () => expect(response?.statusCode).toBe(HttpCode.OK));
  test('Return list of 1 article', () =>
    expect(response?.body.length).toBe(mocks.length));
  test('The first article id is "HL8m2C', () =>
    expect(response?.body[0].id).toBe(ARTICLE_ID));
});

describe('API returns an article with given id', () => {
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app).get(`${Url.articles}/HL8m2C`);
  });

  test('Status code 200', () => expect(response?.statusCode).toBe(HttpCode.OK));
  test('Article title is "Куплю антиквариат."', () =>
    expect(response?.body.title).toBe(ARTICLE_TITLE));
});
