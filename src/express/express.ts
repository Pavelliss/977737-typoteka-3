import express from 'express';
import userRouter from './routes/user';
import articleRouter from './routes/articles';
import mainRoutes from './routes/main';
import * as path from 'path';

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';

const app = express();

app.use('/', mainRoutes);
app.use('/user', userRouter);
app.use('article', articleRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set('views', path.resolve(__dirname, TEMPLATES_DIR));
app.set('view engine', 'pug');

app.listen(DEFAULT_PORT);
