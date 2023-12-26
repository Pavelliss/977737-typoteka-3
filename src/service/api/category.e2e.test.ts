import { describe } from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import category from './category';
import { TArticle } from '../../types';
import Category from '../data-service/category';
import { HttpCode } from '../../constants';
import { Url } from './constants';

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

const app = express();
app.use(express.json());
category(app, new Category(mocks));

describe('API returns category list', () => {
  let response: supertest.Response;

  beforeAll(async () => {
    response = await supertest(app).get(Url.category);
  });

  test('Status code 200', () => expect(response.statusCode).toBe(HttpCode.OK));
  test('return 4 category', () => expect(response.body.length).toBe(4));
  test('Categories names are: "Игры", "Животные", "Книги", "Разное"', () =>
    expect(response.body).toEqual(mocks[0].categories));
});
