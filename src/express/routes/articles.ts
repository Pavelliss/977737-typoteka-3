import { Router } from 'express';

const articleRouter = Router();

articleRouter.get('/category/:id', (_, res) => res.render('articles/articles-by-category'));
articleRouter.get('/add', (_, res) => res.render('articles/post'));
articleRouter.get('/edit/:id', (_, res) => res.render('articles/post'));
articleRouter.get('/:id', (_, res) => res.render('articles/post-detail'));

export default articleRouter;
