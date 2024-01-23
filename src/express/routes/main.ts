import { Router } from 'express';
import { defaultAPI } from '../api';

const mainRoutes = Router();
const api = defaultAPI;

mainRoutes.get('/', async (_, res) => {
  const articles = await api.getArticles();
  res.render('main', { articles });
});
mainRoutes.get('/register', (_, res) => res.render('sign-up'));
mainRoutes.get('/login', (_, res) => res.render('login'));
mainRoutes.get('/search', (_, res) => res.render('search'));
export default mainRoutes;
