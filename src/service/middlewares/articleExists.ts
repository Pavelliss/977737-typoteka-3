import { Request, Response, NextFunction } from 'express';
import Article from '../data-service/article';
import { HttpCode } from '../../constants';

export default (service: Article) => (req: Request, res: Response, next: NextFunction) => {
  const { articleId } = req.params;
  const article = service.findById(articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND).send(`Article with ${articleId} not found`);
  }

  res.locals.article = article;

  return next();
};
