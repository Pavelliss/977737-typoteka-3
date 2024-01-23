import { HttpCode } from '../../constants';
import { Request, Response, NextFunction } from 'express';

const requireFields = ['type', 'title', 'description', 'sum', 'picture', 'categories'];
export default (req: Request, res: Response, next: NextFunction) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle || {});

  const isKeysExists = requireFields.every((key) => keys.includes(key));
  if (!isKeysExists) {
    res.status(HttpCode.BAD_REQUEST).send('Bad request');
  }
  next();
};
