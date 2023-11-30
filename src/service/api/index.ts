import { Router } from 'express';
import { getMockData } from '../lib/get-mock-data';
import category from './category';
import Category from '../data-service/category';

const app = Router();

getMockData().then((articles) => {
  category(app, new Category(articles));
});
export default app;
