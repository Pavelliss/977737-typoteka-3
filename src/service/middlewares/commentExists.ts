import { Request, Response, NextFunction } from 'express';
import Article from '../data-service/article';
import { HttpCode } from '../../constants';

export default (service: Article) => (req: Request, res: Response, next: NextFunction) => {
  const { articleId, commentId } = req.params;
  const comment = service.findCommentById(articleId, commentId);

  if (!comment) {
    return res.status(HttpCode.NOT_FOUND).send(`Comment with ${commentId} not found`);
  }

  res.locals.article = comment;

  return next();
};
