import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (_, res) => res.send('/my'));
userRouter.get('/comments', (_, res) => res.send('/my/comments'));
userRouter.get('/categories', (_, res) => res.send('/my/categories'));

export default userRouter;
