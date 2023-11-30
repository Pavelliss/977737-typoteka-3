import { Router } from 'express';
import { getMockData } from '../lib/get-mock-data';
import category from './category';
import Category from '../data-service/category';
import article from './article';
import Article from '../data-service/article';

const app = Router();

getMockData().then((articles) => {
  category(app, new Category(articles));
  article(app, new Article(articles));
});
export default app;
