import { Router } from 'express';
import { getMockData } from '../lib/get-mock-data';
import category from './category';
import Category from '../data-service/category';
import article from './article';
import Article from '../data-service/article';
import search from './search';
import Search from '../data-service/search';

const app = Router();

getMockData().then((articles) => {
  category(app, new Category(articles));
  article(app, new Article(articles));
  search(app, new Search(articles));
});
export default app;
