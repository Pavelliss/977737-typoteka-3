import { TArticle } from '../../types';
import express from 'express';
import article from './article';
import Article from '../data-service/article';
import supertest from 'supertest';
import { Url } from './constants';
import { HttpCode } from '../../constants';

const mocks: TArticle[] = [
  {
    id: 'HL8m2C',
    type: 'sale',
    title: 'Куплю антиквариат.',
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
    expect(response?.body[0].id).toBe('HL8m2C'));
});
