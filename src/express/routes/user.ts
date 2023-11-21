import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (_, res) => res.send('/user'));
userRouter.get('/comments', (_, res) => res.send('/user/comments'));
userRouter.get('/categories', (_, res) => res.send('/user/categories'));

export default userRouter;
