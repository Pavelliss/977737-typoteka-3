import { TArticle, TNewArticle } from '../../types';
import express from 'express';
import article from './article';
import Article from '../data-service/article';
import supertest from 'supertest';
import { Url } from './constants';
import { HttpCode } from '../../constants';

const ARTICLE_ID = 'HL8m2C';
const ARTICLE_TITLE = 'Куплю антиквариат.';
const FAKE_ID = 'fakeId';
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

const newArticle: TNewArticle = {
  type: 'offer',
  title: 'Test title',
  description: 'Test description',
  sum: 100,
  picture: 'test.img',
  categories: ['Книги', 'Разное'],
};

const invalidArticle: Omit<TNewArticle, 'categories'> = {
  type: 'offer',
  title: 'Test title',
  description: 'Test description',
  sum: 100,
  picture: 'test.img',
};

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

  test('Status code is 200', () => expect(response?.statusCode).toBe(HttpCode.OK));
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

  test('Status code is 200', () => expect(response?.statusCode).toBe(HttpCode.OK));
  test('Article title is "Куплю антиквариат."', () =>
    expect(response?.body.title).toBe(ARTICLE_TITLE));
});

describe('API create article if data valid', () => {
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app).post(Url.articles).send(newArticle);
  });

  test('Status code is 201', () => expect(response?.statusCode).toBe(HttpCode.SUCCESS));
  test('Article count is changed', () =>
    supertest(app)
      .get(Url.articles)
      .expect((res) => expect(res.body.length).toBe(2)));
});

describe('API refuses to create an article if data is invalid', () => {
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app).post(Url.articles).send(invalidArticle);
  });

  test('Status code is 400', () =>
    expect(response?.statusCode).toBe(HttpCode.BAD_REQUEST));
});

describe('API change existent article', () => {
  const changedArticle = Object.assign(newArticle, { type: 'sale' });
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app)
      .put(`${Url.articles}/${ARTICLE_ID}`)
      .send(changedArticle);
  });

  test('Status code is 200', () => expect(response?.statusCode).toBe(HttpCode.SUCCESS));
  test('Return the changed article', () =>
    expect(response?.body).toEqual(expect.objectContaining(changedArticle)));
});

test('API returns status code 404 when trying to change non-existent article', () => {
  const changedArticle = Object.assign(newArticle, {});
  const app = createApi();

  return supertest(app)
    .put(`${Url.articles}/${FAKE_ID}`)
    .send(changedArticle)
    .expect(HttpCode.NOT_FOUND);
});

test('API returns status code 400 when trying to change an article with invalid data', () => {
  const app = createApi();

  return supertest(app)
    .put(`${Url.articles}/${ARTICLE_ID}`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe('API delete an article', () => {
  const app = createApi();
  let response: supertest.Response | null = null;

  beforeAll(async () => {
    response = await supertest(app).delete(`${Url.articles}/${ARTICLE_ID}`);
  });

  test('Status code is 201', () => expect(response?.statusCode).toBe(HttpCode.SUCCESS));
  test('Return delete article', () => expect(response?.body.id).toBe(ARTICLE_ID));
});

test('API refuses to delete non-existent article', () => {
  const app = createApi();

  return supertest(app).delete(`${Url.articles}/${FAKE_ID}`).expect(HttpCode.NOT_FOUND);
});

describe('API create a new comment', () => {
  const app = createApi();
  let response: supertest.Response | null = null;
  const text = 'new comment';

  beforeAll(async () => {
    response = await supertest(app)
      .post(`${Url.articles}/${ARTICLE_ID}/comments`)
      .send({ text });
  });

  test('Status code is 201', () => expect(response?.statusCode).toBe(HttpCode.SUCCESS));
  test('New comment is created', () => expect(response?.body.text).toEqual(text));
});

test('API refuses to create a comment to non-existent article', () => {
  const app = createApi();
  return supertest(app)
    .post(`${Url.articles}/${FAKE_ID}/comments`)
    .expect(HttpCode.NOT_FOUND);
});

test('API refuses to delete non-existent comment', () => {
  const app = createApi();
  return supertest(app)
    .delete(`${Url.articles}/${ARTICLE_ID}/comments/${FAKE_ID}`)
    .expect(HttpCode.NOT_FOUND);
});
