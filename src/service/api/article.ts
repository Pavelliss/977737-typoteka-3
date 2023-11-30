import { Request, Response, Router } from 'express';
import Article from '../data-service/article';
import { HttpCode } from '../../constants';
import articleValidator from '../middlewares/articleValidator';
import articleExists from '../middlewares/articleExists';
import commentExists from '../middlewares/commentExists';
import commentValidator from '../middlewares/commentValidator';

const router = Router();

export default (app: Router, service: Article) => {
  app.use('/articles', router);

  router.get('/', async (_, res) => {
    const articles = service.findAll();

    return res.status(HttpCode.OK).json(articles);
  });

  router.get('/:articleId', articleExists(service), (req, res) => {
    const { articleId } = req.params;
    const article = service.findById(articleId);

    return res.status(HttpCode.OK).json(article);
  });

  router.post('/', articleValidator, (req, res) => {
    const newArticle = service.create(req.body);

    return res.status(HttpCode.CREATED).json(newArticle);
  });

  router.put('/:articleId', [articleExists(service), articleValidator], (req: Request, res: Response) => {
    const { articleId } = req.params;
    const updateArticle = service.edit(articleId, req.body);

    return res.status(HttpCode.CREATED).json(updateArticle);
  });

  router.delete('/:articleId', articleExists(service), (req, res) => {
    const { articleId } = req.params;
    const article = service.delete(articleId);

    return res.status(HttpCode.CREATED).json(article);
  });

  router.get('/:articleId/comments', articleExists(service), (req, res) => {
    const { articleId } = req.params;
    const comments = service.findAllComments(articleId);

    return res.status(HttpCode.OK).json(comments);
  });

  router.delete('articles/:articleId/comments/:commentId', [articleExists(service), commentExists(service)], (req: Request, res: Response) => {
    const { articleId, commentId } = req.params;
    const comment = service.deleteComment(articleId, commentId);

    return res.status(HttpCode.CREATED).json(comment);
  });

  router.post('articles/:articleId/comments', [articleExists(service), commentValidator], (req: Request, res: Response) => {
    const { articleId } = req.params;
    const comment = service.createComment(articleId, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  });
};
