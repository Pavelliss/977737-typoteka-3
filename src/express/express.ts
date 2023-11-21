import express from 'express';
import userRouter from './routes/user';
import articleRouter from './routes/articles';
import mainRoutes from './routes/main';

const DEFAULT_PORT = 8080;

const app = express();

app.use('/', mainRoutes);
app.use('/user', userRouter);
app.use('article', articleRouter);

app.listen(DEFAULT_PORT);
