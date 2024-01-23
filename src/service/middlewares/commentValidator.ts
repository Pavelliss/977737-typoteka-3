import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../../constants';

const REQUIRE_FIELD = 'text';

export default (req: Request, res: Response, next: NextFunction) => {
  const newComment = req.body;
  const isKeyExists = Object.keys(newComment).includes(REQUIRE_FIELD);

  if (!isKeyExists) {
    res.status(HttpCode.BAD_REQUEST as 404).send('Bad request');
  }
  next();
};
