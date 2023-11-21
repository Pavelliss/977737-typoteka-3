import { Router } from 'express';

const mainRoutes = Router();

mainRoutes.get('/', (_, res) => res.send('/'));
mainRoutes.get('/register', (_, res) => res.send('/register'));
mainRoutes.get('/login', (_, res) => res.send('/login'));
mainRoutes.get('/search', (_, res) => res.send('/search'));
export default mainRoutes;
