import { Router } from 'express';

const mainRoutes = Router();

mainRoutes.get('/', (_, res) => res.render('main'));
mainRoutes.get('/register', (_, res) => res.render('sign-up'));
mainRoutes.get('/login', (_, res) => res.render('login'));
mainRoutes.get('/search', (_, res) => res.render('search'));
export default mainRoutes;
