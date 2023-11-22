import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (_, res) => res.render('user/user'));
userRouter.get('/comments', (_, res) => res.render('user/comments'));
userRouter.get('/categories', (_, res) => res.render('user/all-categories'));

export default userRouter;
