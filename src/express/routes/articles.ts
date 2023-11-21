import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/', (_, res) => res.send('/article'));
articleRouter.get('/:id', (_, res) => res.send('/article/:id'));
articleRouter.get('/edit/:id', (_, res) => res.send('/article/edit/:id'));
articleRouter.get('/category/:id', (_, res) => res.send('/article/category/:id'));
articleRouter.get('/articles/add', (_, res) => res.send('/articles/add'));

export default articleRouter;
