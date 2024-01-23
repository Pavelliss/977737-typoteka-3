import { Router } from 'express';
import { HttpCode } from '../../constants';
import Category from '../data-service/category';
import { Url } from './constants';

const router = Router();

export default (app: Router, service: Category) => {
  app.use(Url.category, router);

  router.get('/', async (_, res) => {
    const categories = service.findAll();
    res.status(HttpCode.OK).json(categories);
  });
};
