import { Router } from 'express';
import Search from '../data-service/search';
import { HttpCode } from '../../constants';

const router = Router();

export default (app: Router, service: Search) => {
  app.use('/search', router);

  router.get('/', (req, res) => {
    const { query = '' } = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    const result = service.findAll(`${query}`);
    const resStatus = result.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(resStatus).json(result);
  });
};
